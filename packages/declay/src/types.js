// @flow
import { INIT, PROPERTY, METHOD, CHILD, MIXIN } from './rules';

export type Entity = Object | Class | Function;
export type PropType = INIT | PROPERTY | METHOD | MIXIN | CHILD | VARIABLE;
export type ArgType = COMPUTE | VARIABLE | VALUE;

export type PropData = {
  type: INIT | PROPERTY | METHOD | VARIABLE,
  head: mixed,
  args: Argument[],
  children: Prop[],
};

export type Argument = {
  type: ArgType,
  value: mixed,
}

export type AST = {
  id: string,
  tree: Prop[],
}