import Marklang from "./parser";
import { plugins } from "./plugins";

export const assign = (obj, props) => {
  const init = props.find(prop => prop.key === "@init");
  let entity = initEntity(obj, init ? init.value : []);

  props.forEach(prop => {
    if (prop.key === "@init") return;
    entity = assignProp(entity, prop);
    if (entity[prop.key] && prop.children.length)
      assign(entity[prop.key], prop.children);
  });
  return entity;
};

export const assignProp = (entity, prop) => {
  for (let i = 0; i < plugins.length; i++) {
    const match = prop.line.match(plugins[i].pattern);
    if (match) return plugins[i].do(entity, prop, ...match.splice(1));
  }

  if (prop.value.length) {
    const value = prop.value.length > 1 ? prop.value : prop.value[0];
    setProp(entity, prop.key, value);
  }

  return entity;
};

export const getProp = (entity, prop) =>
  prop.split(".").reduce((temp, key) => temp[key], entity);

export const setProp = (entity, prop, value) => {
  const keys = prop.split(".");
  const last = keys.pop();
  const entry = keys.reduce((temp, key) => {
    if (typeof temp[key] !== "object") temp[key] = {};
    return temp[key];
  }, entity);

  entry[last] = value;
};

/** Initalize class or function */
export const initEntity = (ctor, args) => {
  let entity;
  try {
    entity = new ctor(...args);
  } catch (e) {
    entity = ctor(...args);
  }
  return entity;
};

const Templator = entity => {
  return (strs, ...values) => {
    const props = Marklang(strs, ...values);
    return () => assign(entity, props);
  };
};

export default Templator;
