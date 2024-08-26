import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import getData from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let filePath1;
const result = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

beforeEach(() => {
  filePath1 = '';
});

test('parsing json', () => {
  filePath1 = getFixturePath('file1.json');
  expect(getData(filePath1)).toEqual(result);
});

test('parsing yaml', () => {
  filePath1 = getFixturePath('file1.yaml');
  expect(getData(filePath1)).toEqual(result);
});
