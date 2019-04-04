import { addPlugin, getProp } from './Templator';

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
  const method = getProp(obj, key.slice(1));

  if(typeof method !== 'function') 
    throw Error(`Templator error: ${key.slice(1)} is not a function`);

  method(...value);
  return obj;
});

addPlugin(/(.+) @/, (obj, {key, value}) => {
  if(typeof value[1] !== 'function') 
    throw Error(`Templator error: ${value[1]} is not a function`);

  return Object.assign(obj, { [key]: value[1].bind(obj)(obj) });
});
