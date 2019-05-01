import { addPlugin, getProp } from './plugin';
import { add } from './get';

addPlugin('@init', (ctor, {value}) => {
  if(typeof ctor !== 'function') 
    throw Error(`Templator error: @init use only for function`);

  let entity;
  try {
    entity = new ctor(...value);
  } catch {
    entity = ctor(...value);
  }
  if(ctor._id) add(entity, ctor._id);
  return entity;
});

addPlugin(/^#(.+)/, (obj, {key}) => {
  obj._id =  key;
  return obj;
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