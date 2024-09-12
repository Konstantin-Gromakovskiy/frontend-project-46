import _ from 'lodash';

const plain = (objects) => {
  const iter = (currentValue, pathArray) => {
    if (!currentValue.children) {
      const currentPathArray = [...pathArray];
      currentPathArray.push(currentValue.name);
      const path = currentPathArray.join('.');
      let answer;
      let value;
      let then;
      let now;

      if (_.isObject(currentValue.value)) {
        value = '[complex value]';
      } else if (_.isString(currentValue.value)) {
        value = `'${currentValue.value}'`;
      } else { value = currentValue.value; }

      if (_.isObject(currentValue.then)) {
        then = '[complex value]';
      } else if (_.isString(currentValue.then)) {
        then = `'${currentValue.then}'`;
      } else { then = currentValue.then; }

      if (_.isObject(currentValue.now)) {
        now = '[complex value]';
      } else if (_.isString(currentValue.now)) {
        now = `'${currentValue.now}'`;
      } else { now = currentValue.now; }

      if (currentValue.type === 'added') {
        answer = `Property '${path}' was ${currentValue.type} with value: ${value}`;
      } if (currentValue.type === 'removed') {
        answer = `Property '${path}' was ${currentValue.type}`;
      } if (currentValue.type === 'updated') {
        answer = `Property '${path}' was ${currentValue.type}. From ${then} to ${now}`;
      }
      return answer;
    }

    const currentPathArray = [...pathArray];
    currentPathArray.push(currentValue.name);
    const nextObjects = currentValue.children.map((child) => iter(child, currentPathArray));
    return nextObjects.filter(Boolean).join('\n');
  };
  const resultArray = objects.map((object) => iter(object, []));
  const result = _.compact(resultArray).join('\n');
  return result;
};

export default plain;
