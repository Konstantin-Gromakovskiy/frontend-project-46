import _ from 'lodash';
import getData from './parsers.js';
import chooseFormat from './formatters/index.js';

const genDiff = (filePath1, filePath2, formatter = 'stylish') => {
  const data1 = getData(filePath1);
  const data2 = getData(filePath2);

  const iter = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const commonKeys = [..._.union(keys1, keys2)].sort();

    const objectWithDifferences = commonKeys.map((key) => {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) { return { name: key, type: 'nested', children: iter(obj1[key], obj2[key]) }; }
      if (!Object.hasOwn(obj1, key)) { return { name: key, type: 'added', value: obj2[key] }; }
      if (!Object.hasOwn(obj2, key)) { return { name: key, type: 'removed', value: obj1[key] }; }
      if (_.isEqual(obj1[key], obj2[key])) { return { name: key, type: 'unchanged', value: obj1[key] }; }
      return {
        name: key, type: 'updated', then: obj1[key], now: obj2[key],
      };
    });
    return objectWithDifferences;
  };
  const result = iter(data1, data2);

  return chooseFormat(result, formatter);
};

export default genDiff;
