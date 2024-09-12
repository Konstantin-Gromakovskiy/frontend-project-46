import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getData = (filePath) => {
  const format = path.extname(filePath);
  const data = fs.readFileSync(filePath, 'utf-8');
  let parse;

  if (format === '.yaml' || format === '.yml') {
    parse = yaml.load(data, 'utf-8');
  } else {
    parse = JSON.parse(data);
  }

  return parse;
};

export default getData;
