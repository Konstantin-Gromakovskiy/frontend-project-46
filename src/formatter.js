import _ from 'lodash';

const stylish = (object) => {
  const iter = (currentValue, depth) => {
    const replacer = ' ';
    const spaceCount = 4;
    const indentSize = depth * spaceCount;
    const currentIndent = replacer.repeat(indentSize);
    const lines = Object.entries(currentValue)
      .reduce((acc, [key, value]) => {
        if (!_.isObject(value)) {
          acc += `${currentIndent}${key}: ${value}\n`;
        } else {
          acc += `${currentIndent}${key}: { \n${iter(value, depth + 1)}`;
        }
        return acc;
      }, '');
    return lines;
  };
  return `{\n${iter(object, 1)}}`;
};

export default stylish;
