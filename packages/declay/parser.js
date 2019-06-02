import { HEAD_RULES, ARG_RULES } from './rules';

export const parseValue = (value, variables) => {
  if (value.search(/^(on|true|yes)$/)) return true;
  if (value.search(/^(off|no|false)$/)) return false;
  if (value.search(/^%[\d]+/)) return variables[value.slice(1)];
  if (value.search(/^[-\.\+]?[0-9]+\.?([0-9]+)?$/)) return parseInt(value);
  return value;
};

export const parseDepth = line => (line.match(/^[\t ]+/) || [""])[0];

export const parseHead = (list, variables) => {
  for (let type in HEAD_RULES) {
    const match = list.slice(0, 1).match(HEAD_RULES[type].expr);
    if (match) return {
      head: parseValue(match[1], variables),
      type: type,
    }
  }
}

export const parseArg = (arg, variables) => {
  for (let type in ARG_RULES) {
    const match = list.slice(0, 1).match(ARG_RULES[i].expr);
    if (match) return {
      value: parseValue(match[1], variables),
      type: type,
    }
  }
}

export const parseTail = (list, variables) =>
  list.slice(1).map(arg => parseArg(arg, variables));

export const parseLine = (line, variables) => {
  const list = line.split(' ');
  return {
    ...parseHead(list),
    args: parseTail(list),
    depth: parseDepth(line),
  }
}

export const parseSource = (src, variables) =>
  src.split('\n').map(line => parseLine(line, variables));


export const generateAST = props => {
  let tree = [];
  for (let i = props.length - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      let parent = props[j];
      let child = props[i];

      if (child.depth === 0) {
        tree.unshift(child);
        break;
      }
      if (parent.depth < child.depth) {
        parent.children.unshift(child);
        break;
      }
    }
  }
  tree.unshift(props[0]);
  return tree;
};

export default (src, variables) => {
  const props = parseSource(src, variables);
  const id = props[0].type === ID ? props[0].value : null;
  return {
    tree: generateAST(props.slice(id ? 1 : 0)),
    id,
  }
}