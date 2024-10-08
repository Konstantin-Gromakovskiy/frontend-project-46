import path from 'path';
import fs from 'fs';
import generateDiffTree from './generateDiffTree.js';
import getData from './parsers.js';
import format from './formatters/index.js';

const genDiff = (filePath1, filePath2, formatter = 'stylish') => {
  const extension1 = path.extname(filePath1);
  const extension2 = path.extname(filePath2);
  const content1 = fs.readFileSync(filePath1, 'utf-8');
  const content2 = fs.readFileSync(filePath2, 'utf-8');

  const data1 = getData(content1, extension1);
  const data2 = getData(content2, extension2);

  const result = generateDiffTree(data1, data2);

  return format(result, formatter);
};

export default genDiff;
