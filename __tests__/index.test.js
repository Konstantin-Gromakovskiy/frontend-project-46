import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let filepath1;
let filepath2;
let expected;

beforeEach(() => {
  filepath1 = '';
  filepath2 = '';
  expected = '';
});

test('genDiff json', () => {
  filepath1 = getFixturePath('file1.json');
  filepath2 = getFixturePath('file2.json');
  expected = readFile('expected.txt');
  expect(genDiff(filepath1, filepath2)).toEqual(expected);
});

test('genDiff yaml', () => {
  filepath1 = getFixturePath('file1.json');
  filepath2 = getFixturePath('file2.json');
  expected = readFile('expected.txt');
  filepath1 = getFixturePath('file1.yaml');
  filepath2 = getFixturePath('file2.yaml');
  expect(genDiff(filepath1, filepath2)).toEqual(expected);
});
