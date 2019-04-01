import { addPlugin } from './Templator';

addPlugin('@init', (ctor, {value}) => {
  if(typeof ctor !== 'function') 
    throw Error(`Templator error: @init use only for function`);

  try {
    return new ctor(...value);
  } catch {
    return ctor(...value);
  }
});

addPlugin(/@(.+)/, (obj, {key, value}) => {
  const method = key.slice(1);

  if(typeof obj[method] !== 'function') 
    throw Error(`Templator error: ${method} is not a function`);

  obj[method](...value);
  return obj;
});

addPlugin(/(.+) @/, (obj, {key, value}) => {
  if(typeof value[1] !== 'function') 
    throw Error(`Templator error: ${value[1]} is not a function`);

  return Object.assign(obj, { [key]: value[1].bind(obj)(obj) });
});
