import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import compare from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let filepath1;
let filepath2;
let expected;

beforeEach(() => {
  filepath1 = getFixturePath('file1.json');
  filepath2 = getFixturePath('file2.json');

  expected = {
    '- follow': false,
    '  host': 'hexlet.io',
    '- proxy': '123.234.53.22',
    '- timeout': 50,
    '+ timeout': 20,
    '+ verbose': true,
  };
});

test('compare', () => {
  expect(compare(filepath1, filepath2)).toEqual(expected);
});
