import Marklang from './Marklang';

export const plugins = [];

export const addPlugin = (expr, fn) => 
  plugins.push({ pattern: expr, do: fn });

export const removePlugin = (expr) => {
  for(let i = 0; i < plugins.length; i++) {
    if(plugins[i].pattern == expr) return plugins.splice(i, 1);
  }
}

export const assign = (entity, props) => {
  let obj = entity;
  props.forEach(prop => {
    obj = assignProp(obj, prop);
    if(obj[prop.key] && prop.children.length) 
      assign(obj[prop.key], prop.children);
  });
  return obj
}

const assignProp = (entity, prop) => {
  for(let i = 0; i < plugins.length; i++) {
    const match = prop.line.match(plugins[i].pattern);
    if(match) return plugins[i].do(entity, prop, ...match.splice(1));
  }

  return Object.assign(entity, { 
    [prop.key]: prop.value.length > 1 ? prop.value : prop.value[0] 
  });
}


const Templator = (entity) => {
  return (strs, ...values) => {
    const props = Marklang(strs, ...values);
    return assign(entity, props);
  }
}

export default Templator;