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
        acc[key] = { children: iter(obj1[key], obj2[key]), type: 'nested' };
      } else if (!Object.hasOwn(obj1, key)) {
        acc[key] = { value: obj2[key], type: 'added' };
      } else if (!Object.hasOwn(obj2, key)) {
        acc[key] = { value: obj1[key], type: 'deleted' };
      } else if (_.isEqual(obj1[key], obj2[key])) {
        acc[key] = { value: obj1[key], type: 'unchanged' };
      } else {
        acc[key] = { then: obj1[key], now: obj2[key], type: 'updated' };
      }
      return acc;
    }, {});
    return objectWithDifferences;
  };
  const result = iter(data1, data2);
  return stylish(result);
};

// console.dir(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json'), { depth: null });
console.log(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json'));

// export default genDiff;
