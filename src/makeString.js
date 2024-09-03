import _ from 'lodash';

function recursiveTraverse(obj, depth1) {
  function traverse(currentObj, depth) {
    const spacesCount = 1;
    const replacer = ' ';
    const indentSize = depth * spacesCount;
    const bracketIndent = replacer.repeat(indentSize - 4);
    const currentIndent = replacer.repeat(indentSize);
    if (typeof currentObj === 'object' && currentObj !== null) {
      const line = Object.entries(currentObj)
        .map(([key, value]) => `\n${currentIndent}${key}: ${traverse(value, depth + 4)}`).join('');
      return `{${line}\n${bracketIndent}}`;
    }
    return `${currentObj}`;
  }
  const result = traverse(obj, depth1 + 4);
  return result;
}
export default recursiveTraverse;
