import _ from 'lodash';

const compare = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const commonKeys = _.union(keys1, keys2);

  const objectWithDifferences = commonKeys.reduce((acc, key) => {
    if (!Object.hasOwn(obj1, key)) {
      acc[`+ ${key}`] = obj2[key];
    } else if (!Object.hasOwn(obj2, key)) {
      acc[`- ${key}`] = obj1[key];
    } else if (obj1[key] === obj2[key]) {
      acc[`  ${key}`] = obj1[key];
    } else {
      acc[`- ${key}`] = obj1[key];
      acc[`+ ${key}`] = obj2[key];
    }
    return acc;
  }, {});
  return objectWithDifferences;
};

export default compare;
