import _ from 'lodash';
import getData from './parsing.js';

const genDiff = (filePath1, filePath2) => {
  const data1 = getData(filePath1);
  const data2 = getData(filePath2);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const commonKeys = _.union(keys1, keys2);

  const objectWithDifferences = commonKeys.reduce((acc, key) => {
    if (!Object.hasOwn(data1, key)) {
      acc[`+ ${key}`] = data2[key];
    } else if (!Object.hasOwn(data2, key)) {
      acc[`- ${key}`] = data1[key];
    } else if (data1[key] === data2[key]) {
      acc[`  ${key}`] = data1[key];
    } else {
      acc[`- ${key}`] = data1[key];
      acc[`+ ${key}`] = data2[key];
    }
    return acc;
  }, {});
  return objectWithDifferences;
};

export default genDiff;
