import { readFileSync } from 'node:fs';

const getData = (filePath) => {
  const file = readFileSync(filePath);
  return JSON.parse(file);
};

export default getData;
