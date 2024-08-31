import _ from 'lodash';

const stylish = (object) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) return `${currentValue}\n`;
    const replacer = '.';
    const spaceCount = 4;
    const indentSize = depth * spaceCount;
    const currentIndent = replacer.repeat(indentSize);
    const lines = Object.entries(currentValue)
      .reduce((acc, [key, value]) => {
        if (value.type === 'added') {
          acc += `${currentIndent}+ ${key}: ${iter(value.value, depth + 1)}`;
        } else if (value.type === 'deleted') {
          acc += `${currentIndent}- ${key}: ${iter(value.value, depth + 1)}`;
        } else if (value.type === 'updated') {
          acc += `${currentIndent}- ${key}: ${iter(value.then, depth + 1)}`;
          acc += `${currentIndent}+ ${key}: ${iter(value.then, depth + 1)}`;
        } else if (value.type === 'unchanged') {
          acc += `${currentIndent}  ${key}: ${iter(value.value, depth + 1)}`;
        } else if (value.type === 'nested') {
          acc += `${currentIndent} ${key}: {\n${iter(value.children, depth + 1)}${currentIndent}}\n`;
        } else { acc += `\n${currentIndent}${key}: ${value}\n${currentIndent}}\n`; }

        return acc;
      }, '');
    return lines;
  };
  return iter(object, 1);
};

export default stylish;
