import _ from 'lodash';

const generateDiffTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(allKeys);

  const diffTree = sortedKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) { return { name: key, type: 'nested', children: generateDiffTree(obj1[key], obj2[key]) }; }
    if (!Object.hasOwn(obj1, key)) { return { name: key, type: 'added', value: obj2[key] }; }
    if (!Object.hasOwn(obj2, key)) { return { name: key, type: 'removed', value: obj1[key] }; }
    if (_.isEqual(obj1[key], obj2[key])) { return { name: key, type: 'unchanged', value: obj1[key] }; }
    return {
      name: key, type: 'updated', then: obj1[key], now: obj2[key],
    };
  });
  return diffTree;
};
export default generateDiffTree;
