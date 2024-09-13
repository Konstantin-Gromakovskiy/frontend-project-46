import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getData = (filePath) => {
  const format = path.extname(filePath);
  const data = fs.readFileSync(filePath, 'utf-8');

  if (format === '.yaml' || format === '.yml') {
    return yaml.load(data, 'utf-8');
  }
  return JSON.parse(data);
};

export default getData;
