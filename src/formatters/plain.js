import _ from 'lodash';

const plain = (objects) => {
  const getAnswer = (value) => {
    if (_.isObject(value)) { return '[complex value]'; }
    if (_.isString(value)) { return `'${value}'`; }
    return value;
  };

  const iter = (currentValue, pathArray) => {
    const currentPathArray = [...pathArray, currentValue.name];
    const path = currentPathArray.join('.');

    switch (currentValue.type) {
      case 'added': return `Property '${path}' was ${currentValue.type} with value: ${getAnswer(currentValue.value)}`;
      case 'removed': return `Property '${path}' was ${currentValue.type}`;
      case 'updated': return `Property '${path}' was ${currentValue.type}. From ${getAnswer(currentValue.then)} to ${getAnswer(currentValue.now)}`;
      case 'unchanged': return undefined;
      case 'nested': return currentValue.children.map((child) => iter(child, currentPathArray)).filter(Boolean).join('\n');
      default: throw Error('unknown type');
    }
  };
  const resultArray = objects.flatMap((object) => iter(object, []));
  const result = _.compact(resultArray).join('\n'); // здесь все равно остается последний пустой элемент в конце массива, поэтому применяю compact
  return result;
};

export default plain;
