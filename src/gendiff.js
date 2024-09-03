import _ from 'lodash';
import getData from './parsers.js';
import stylish from './formatter.js';

const genDiff = (filePath1, filePath2) => {
  const data1 = getData(filePath1);
  const data2 = getData(filePath2);

  const iter = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const commonKeys = _.union(keys1, keys2).sort();

    const objectWithDifferences = commonKeys.reduce((acc, key) => {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        acc.push({ name: key, type: 'nested', children: iter(obj1[key], obj2[key]) });
      } else if (!Object.hasOwn(obj1, key)) {
        acc.push({ name: key, type: 'added', value: obj2[key] });
      } else if (!Object.hasOwn(obj2, key)) {
        acc.push({ name: key, type: 'deleted', value: obj1[key] });
      } else if (_.isEqual(obj1[key], obj2[key])) {
        acc.push({ name: key, type: 'unchanged', value: obj1[key] });
      } else {
        acc.push({
          name: key, type: 'updated', then: obj1[key], now: obj2[key],
        });
      }

      return acc;
    }, []);
    return objectWithDifferences;
  };
  const result = iter(data1, data2);
  return stylish(result);
};

export default genDiff;
