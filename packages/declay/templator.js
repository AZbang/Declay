import { set, call, mix, add, init } from './manipulator';
import parse from './parser';

export const flow = (object, props, variables) =>
  props.reduce((enity, prop), prop => {
    const value = computeValue(prop, variables);
    if (prop.type === INIT) return init(enity, value);
    if (prop.type === MIXIN) return mix(entity, prop.head);
    if (prop.type === CHILD) return add(entity, prop.head);
    if (prop.type === METHOD) return call(entity, prop.head, value);
    if (prop.type === PROPERTY) return set(entity, prop.head, value);
  }, object);

export const computeArgs = (entity, args) =>
  prop.args.map((arg) => {
    if (arg.type === COMPUTE) return arg.value(entity); 
    if (arg.type === VARIABLE) return variables[arg.value];
    if (arg.type === VALUE) return arg.value;
  });

export const computeValue = (prop, variables) => {
  if (prop.children.length) return flow({}, prop.children, variables);
  else return computeArgs(prop.args, variables);
}

export const cancatTemplateStrings = strs =>
  strs.reduce((mark, str, i) => (mark += `${str}%${i}`), "");

export const Templator = entity => (strings, locals) => {
  const markup = concatTemplateStrings(strings);
  const ast = parse(markup, locals);

  const template = variables => flow(entity, ast.tree, variables);
  template.id = ast.id;
  return template;
};
