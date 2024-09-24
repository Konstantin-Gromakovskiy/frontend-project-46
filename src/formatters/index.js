import plain from './plain.js';
import json from './json.js';
import stylish from './stylish.js';

const chooseFormat = (data, format) => {
  switch (format) {
    case 'plain': return plain(data);
    case 'json': return json(data);
    case 'stylish': return stylish(data);
    default: throw new Error('Unknown format');
  }
};

export default chooseFormat;
