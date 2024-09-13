import _ from 'lodash';

const plain = (objects) => {
  const getAnswer = (value) => {
    if (_.isObject(value)) { return '[complex value]'; }
    if (_.isString(value)) { return `'${value}'`; }
    return value;
  };

  const iter = (currentValue, pathArray) => {
    if (!currentValue.children) {
      const currentPathArray = [...pathArray, currentValue.name];
      const path = currentPathArray.join('.');

      if (currentValue.type === 'added') { return `Property '${path}' was ${currentValue.type} with value: ${getAnswer(currentValue.value)}`; }
      if (currentValue.type === 'removed') { return `Property '${path}' was ${currentValue.type}`; }
      if (currentValue.type === 'updated') { return `Property '${path}' was ${currentValue.type}. From ${getAnswer(currentValue.then)} to ${getAnswer(currentValue.now)}`; }
      return undefined;
    }

    const currentPathArray = [...pathArray, currentValue.name];
    console.log(currentValue.children);
    const nextObjects = currentValue.children.map((child) => iter(child, currentPathArray));
    return nextObjects.filter(Boolean).join('\n');
  };
  const resultArray = objects.map((object) => iter(object, []));
  const result = _.compact(resultArray).join('\n');
  return result;
};

export default plain;
