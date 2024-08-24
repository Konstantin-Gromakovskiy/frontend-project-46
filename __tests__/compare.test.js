import compare from '../src/compare.js';

let object1;
let object2;
let expected;

beforeEach(() => {
  object1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  object2 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };

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
  expect(compare(object1, object2)).toEqual(expected);
});
