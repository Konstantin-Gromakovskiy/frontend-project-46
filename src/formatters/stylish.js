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
      return ['{', ...result, `${indent(currentDepth - 1)}}`].join('\n');
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
        return [`${indent(depth) + currentValue.name}: {`, ...currentValue.children.flatMap((child) => iter(child, depth + 1)), `${indent(depth)}}`];
      default: throw Error('unknown type');
    }
  };
  const result = diff.flatMap((object) => iter(object, 1));
  return ['{', ...result, '}'].join('\n');
};
export default stylish;
