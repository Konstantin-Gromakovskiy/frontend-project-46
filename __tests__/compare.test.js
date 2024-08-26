import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let filepath1;
let filepath2;
const expected = {
  '- follow': false,
  '  host': 'hexlet.io',
  '- proxy': '123.234.53.22',
  '- timeout': 50,
  '+ timeout': 20,
  '+ verbose': true,
};

beforeEach(() => {
  filepath1 = '';
  filepath2 = '';
});

test('genDiff json', () => {
  filepath1 = getFixturePath('file1.json');
  filepath2 = getFixturePath('file2.json');
  expect(genDiff(filepath1, filepath2)).toEqual(expected);
});

test('genDiff yaml', () => {
  filepath1 = getFixturePath('file1.yaml');
  filepath2 = getFixturePath('file2.yaml');
  expect(genDiff(filepath1, filepath2)).toEqual(expected);
});
