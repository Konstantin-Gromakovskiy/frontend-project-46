import makeString from './makeString.js';

const stylish = (objects) => {
  const iter = (currentValue, depth) => {
    const spacesCount = 4;
    const replacer = ' ';
    const indentSize = depth * spacesCount;
    const cutIndentSize = depth * spacesCount - 2;
    const currentIndent = replacer.repeat(indentSize);
    const cutCurrentIndent = replacer.repeat(cutIndentSize);

    if (!currentValue.children) {
      if (currentValue.type === 'added') {
        return `${cutCurrentIndent}+ ${currentValue.name}: ${makeString(currentValue.value, indentSize)}\n`;
      } if (currentValue.type === 'unchanged') {
        return `${cutCurrentIndent}  ${currentValue.name}: ${makeString(currentValue.value, indentSize)}\n`;
      } if (currentValue.type === 'removed') {
        return `${cutCurrentIndent}- ${currentValue.name}: ${makeString(currentValue.value, indentSize)}\n`;
      } if (currentValue.type === 'updated') {
        return `${cutCurrentIndent}- ${currentValue.name}: ${makeString(currentValue.then, indentSize)}\n${cutCurrentIndent}+ ${currentValue.name}: ${makeString(currentValue.now, indentSize)}\n`;
      }
    }
    const nextObjects = currentValue.children.map((child) => iter(child, depth + 2)).join('');
    return [`${currentIndent}${currentValue.name}: {\n${nextObjects}`, `${currentIndent}}\n`].join('');
  };
  const result = objects.map((object) => iter(object, 1)).join('');
  return `{\n${result}}`;
};

export default stylish;
