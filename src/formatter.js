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

// const stylish = (objects) => {
//   console.log(t);
//   const iter = (currentValue, depth) => {
//     if (!_.isObject(currentValue)) return (`${currentValue}`);

//     if (typeof currentValue === 'object' && currentValue.type === 'added') {
//       console.log('пися');
//     }

//     // console.log(currentValue);

//     const lines = currentValue.reduce((acc, item) => {
//       const replacer = '.';
//       const spaceCount = 4;
//       const indentSize = depth * spaceCount;
//       // const currentIndent = replacer.repeat(indentSize)

//       if (item.type === 'added') {
//         acc.push(`+ ${item.name}: ${iter(item.value, depth + 1)}`);
//       }
//       // console.log(acc);
//       return acc;
//     }, []);
//     return lines;
//   };

//   return iter(objects, 1);
// };

// console.log(stylish(data));
