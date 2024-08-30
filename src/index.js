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
      if (!Object.hasOwn(obj1, key)) {
        acc[`+ ${key}`] = obj2[key];
      } else if (!Object.hasOwn(obj2, key)) {
        acc[`- ${key}`] = obj1[key];
      } else if (obj1[key] === obj2[key]) {
        acc[`  ${key}`] = obj1[key];
      } else if (_.isObject(obj1[key])) {
        acc[`  ${key}`] = iter(obj1[key], obj2[key]);
      } else {
        acc[`- ${key}`] = obj1[key];
        acc[`+ ${key}`] = obj2[key];
      }
      return acc;
    }, {});
    return objectWithDifferences;
  };
  const result = iter(data1, data2);
  return stylish(result);
};

export default genDiff;
