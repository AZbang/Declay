import { getProp } from "./templator";
import { add } from "./get";

export const plugins = [];
export const addPlugin = (expr, fn) => plugins.push({ pattern: expr, do: fn });
export const removePlugin = expr => {
  for (let i = 0; i < plugins.length; i++) {
    if (plugins[i].pattern == expr) return plugins.splice(i, 1);
  }
};

addPlugin("@init", (ctor, { value }) => {
  if (typeof ctor !== "function")
    throw Error(`Templator error: @init use only for function`);

  let entity;
  try {
    entity = new ctor(...value);
  } catch (e) {
    entity = ctor(...value);
  }
  if (ctor.id) add(entity, ctor.id);
  return entity;
});

addPlugin(/#(.+)/, (obj, { key }) => {
  obj.id = key;
  return obj;
});

addPlugin(/@(.+)/, (obj, { key, value }) => {
  const method = getProp(obj, key.slice(1));

  if (typeof method !== "function")
    throw Error(`Templator error: ${key.slice(1)} is not a function`);

  method.bind(obj)(...value);
  return obj;
});

addPlugin(/(.+) @/, (obj, { key, value }) => {
  if (typeof value[1] !== "function")
    throw Error(`Templator error: ${value[1]} is not a function`);

  return Object.assign(obj, { [key]: value[1].bind(obj)(obj) });
});
