export const INIT = 1;
export const MIXIN = 2;
export const CHILD = 3;
export const METHOD = 4;
export const PROPERTY = 5;
export const COMPUTE = 6;
export const VARIABLE = 7;
export const VALUE = 8;

export const VALUE_RULES = {
  TRUE: /^(on|true|yes)$/,
  FALSE: /^(off|no|false)$/,
  CONCAT_VARIABLE: /^%[\d]+/,
  DIGITAL: /^[-\.\+]?[0-9]+\.?([0-9]+)?$/,
}

export const HEAD_RULES = {
  [INIT]: />/,
  [MIXIN]: /@%([\d\w]+)/,
  [CHILD]: /%([\d\w]+)/,
  [METHOD]: /@([\d\w]+)/,
  [PROPERTY]: /(.+)/,
}

export const ARG_RULES = {
  [COMPUTE]: /@%([\d\w]+)/,
  [VARIABLE]: /\$([\d\w]+)/,
  [VALUE]: /(.+)/,
}