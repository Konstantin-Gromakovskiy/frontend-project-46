function makeString(obj, depth) {
  function iter(currentObj, currentDepth) {
    const spacesCount = 1;
    const replacer = ' ';
    const indentSize = currentDepth * spacesCount;
    const bracketIndent = replacer.repeat(indentSize - 4);
    const currentIndent = replacer.repeat(indentSize);
    if (typeof currentObj === 'object' && currentObj !== null) {
      const line = Object.entries(currentObj)
        .map(([key, value]) => `\n${currentIndent}${key}: ${iter(value, currentDepth + 4)}`).join('');
      return `{${line}\n${bracketIndent}}`;
    }
    return currentObj;
  }
  const result = iter(obj, depth + 4);
  return result;
}
export default makeString;
