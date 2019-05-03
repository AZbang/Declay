import Marklang from "./parser";

export const assign = (entity, props) => {
  let obj = entity;
  props.forEach(prop => {
    obj = assignProp(obj, prop);
    if (obj[prop.key] && prop.children.length)
      assign(obj[prop.key], prop.children);
  });
  return obj;
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

const Templator = entity => {
  return (strs, ...values) => {
    const props = Marklang(strs, ...values);
    return () => assign(entity, props);
  };
};

export default Templator;
