import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/gendiff.js';

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

test('stylish json', () => {
  filepath1 = getFixturePath('file1.json');
  filepath2 = getFixturePath('file2.json');
  expected = readFile('expected.stylish.txt');
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expected);
});

test('stylish yaml', () => {
  filepath1 = getFixturePath('file1.yaml');
  filepath2 = getFixturePath('file2.yaml');
  expected = readFile('expected.stylish.txt');
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expected);
});

test('plain json', () => {
  filepath1 = getFixturePath('file1.json');
  filepath2 = getFixturePath('file2.json');
  expected = readFile('expected.plain.txt');
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expected);
});

test('plain json', () => {
  filepath1 = getFixturePath('file1.yaml');
  filepath2 = getFixturePath('file2.yaml');
  expected = readFile('expected.plain.txt');
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expected);
});

test('json-format json-file', () => {
  filepath1 = getFixturePath('file1.json');
  filepath2 = getFixturePath('file2.json');
  expected = readFile('expected.json.txt');
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(expected);
});

test('json-format yaml-file', () => {
  filepath1 = getFixturePath('file1.yaml');
  filepath2 = getFixturePath('file2.yaml');
  expected = readFile('expected.json.txt');
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(expected);
});
