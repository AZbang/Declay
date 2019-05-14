import Marklang from "./parser";
import { plugins } from "./plugins";

// TODO: refactor
export const assign = (obj, props) => {
  // init entity
  const init = props.find(prop => prop.key === "@init");
  let value = [];
  if (init)
    value = init.children.length
      ? [createObjectByProps(init.children)]
      : init.value;

  let entity = initEntity(obj, value);

  // bind sub entities
  const children = props
    .filter(prop => typeof prop.key !== "string")
    .map(prop => prop.key);
  entity.__addEntities && entity.__addEntities(children);

  // assign enitity
  props.forEach(prop => {
    if (prop.key === "@init") return;
    if (typeof prop.key !== "string") return;

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

export const createObjectByProps = props =>
  props.reduce((acc, prop) => {
    acc[prop.key] = prop.children.length
      ? createObjectByProps(prop.children)
      : prop.value;
    return acc;
  }, {});

export const getProp = (entity, prop) => {
  const parts = prop.split(".");
  const last = parts.pop();
  const entry = parts.reduce((temp, key) => temp[key], entity);
  return typeof entry[last] === "function"
    ? entry[last].bind(entry)
    : entry[last];
};

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
  if (typeof ctor !== "function") return ctor;
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
    const init = () => assign(entity, props);

    // bind id to init fn
    const idProp = props.find(
      prop => typeof prop.key === "string" && prop.key.match(/#(.+)/)
    );
    init.id = idProp ? idProp.key.slice(1) : null;
    return init;
  };
};

export default Templator;
