import { addPlugin } from './Templator';

const toArgs = (value) => Array.isArray(value) ? value : [value];

addPlugin('@init', (ctor, value) => {
  try {
    return new ctor(...toArgs(value));
  } catch {
    return ctor(...toArgs(value));
  }
});

addPlugin('@tick', (obj, args) => obj);

addPlugin(/@(.+)/, (obj, value, method) => {
  if (typeof obj[method] === 'function')
    obj[method](...toArgs(value));

  return obj;
});