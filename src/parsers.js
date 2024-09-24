import yaml from 'js-yaml';

const getData = (data, format) => {
  if (format === '.yaml' || format === '.yml') {
    return yaml.load(data, 'utf-8');
  }
  return JSON.parse(data);
};

export default getData;
