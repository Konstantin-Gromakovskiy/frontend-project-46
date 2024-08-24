import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import getData from '../src/parsing.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let filePath1;
let result;

beforeAll(() => {
  filePath1 = getFixturePath('file1.json');
  result = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
});

test('parsing', () => {
  expect(getData(filePath1)).toEqual(result);
});
