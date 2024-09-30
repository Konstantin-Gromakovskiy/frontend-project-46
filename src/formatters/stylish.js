import _ from 'lodash';

const stylish = (diff) => {
  const indent = (depth, shiftLeft = 0) => ' '.repeat(4 * depth - shiftLeft);

  const stringify = (obj, depth) => {
    if (!_.isObject(obj)) return obj;

    const iter = (currentObj, currentDepth) => {
      const entries = Object.entries(currentObj);
      const result = entries.map(([key, value]) => {
        if (!_.isObject(value)) return `${indent(currentDepth)}${key}: ${value}`;

        return `${indent(currentDepth)}${key}: ${iter(value, currentDepth + 1)}`;
      });
      return `{\n${result.join('\n')}\n${indent(currentDepth - 1)}}`;
    };
    return iter(obj, depth + 1);
  };

  const iter = (currentValue, depth) => {
    switch (currentValue.type) {
      case 'added':
        return `${indent(depth, 2)}+ ${currentValue.name}: ${stringify(currentValue.value, depth)}`;
      case 'removed':
        return `${indent(depth, 2)}- ${currentValue.name}: ${stringify(currentValue.value, depth)}`;
      case 'unchanged':
        return `${indent(depth, 2)}  ${currentValue.name}: ${stringify(currentValue.value, depth)}`;
      case 'updated':
        return `${indent(depth, 2)}- ${currentValue.name}: ${stringify(currentValue.then, depth)}\n${indent(depth, 2)}+ ${currentValue.name}: ${stringify(currentValue.now, depth)}`;
      case 'nested':
        // Я сделал как ты сказал, но линтер говорит, что нельзя в кейсе создавать константы
        // Если без констант, то получается вот такой длинный return
        // Это норм или можно сделать понятнее?
        return [`${indent(depth) + currentValue.name}: {`, currentValue.children.map((child) => `${iter(child, depth + 1)}`), `${indent(depth)}}`].flat().join('\n');
      default: throw Error('unknown type');
    }
  }; const result = diff.map((object) => iter(object, 1));
  return `{\n${result.join('\n')}\n}`;
};
export default stylish;
