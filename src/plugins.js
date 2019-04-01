import { addPlugin } from './Templator';

const toArgs = (value) => Array.isArray(value) ? value : [value];

addPlugin('@init', (ctor, {value}) => {
  if(typeof ctor !== 'function') 
    throw Error(`Templator error: @init use only for function`);

  try {
    return new ctor(...toArgs(value));
  } catch {
    return ctor(...toArgs(value));
  }
});

addPlugin(/@(.+) (.+)/, (obj, {value}, method) => {
  if(typeof obj[method] !== 'function') 
    throw Error(`Templator error: ${method} is not a function`);

  obj[method](...toArgs(value));
  return obj;
});

addPlugin(/(.+) @/, (obj, {key, value}) => {
  if(typeof value !== 'function') 
    throw Error(`Templator error: ${value} is not a function`);

  return Object.assign(obj, { [key]: value.bind(obj)(obj) });
});
