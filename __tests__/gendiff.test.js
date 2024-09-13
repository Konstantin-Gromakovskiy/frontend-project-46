import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['file1.json', 'file2.json', 'expected.stylish.txt', undefined],
  ['file1.yaml', 'file2.yaml', 'expected.stylish.txt', 'stylish'],
  ['file1.json', 'file2.json', 'expected.plain.txt', 'plain'],
  ['file1.json', 'file2.json', 'expected.json.txt', 'json'],
  ['file1.yml', 'file2.yml', 'result_plain.txt', 'plain'],
])('getDiff with %s and %s, format - %s', (file1, file2, resultFile, format) => {
  const filePath1 = getFixturePath(file1);
  const filePath2 = getFixturePath(file2);
  const expectedOutput = readFile(resultFile);

  expect(genDiff(filePath1, filePath2, format)).toEqual(expectedOutput);
});
