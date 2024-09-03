function makeString(obj, depth1) {
  function iter(currentObj, depth) {
    const spacesCount = 1;
    const replacer = ' ';
    const indentSize = depth * spacesCount;
    const bracketIndent = replacer.repeat(indentSize - 4);
    const currentIndent = replacer.repeat(indentSize);
    if (typeof currentObj === 'object' && currentObj !== null) {
      const line = Object.entries(currentObj)
        .map(([key, value]) => `\n${currentIndent}${key}: ${iter(value, depth + 4)}`).join('');
      return `{${line}\n${bracketIndent}}`;
    }
    return currentObj;
  }
  const result = iter(obj, depth1 + 4);
  return result;
}
export default makeString;
