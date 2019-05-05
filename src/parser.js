export const parseLine = (line, values) => {
  const depth = (line.match(/^[\t ]+/) || [""])[0];
  const [key, ...value] = parseList(line, values);

  if (!key) return null;
  return {
    line,
    key,
    value,
    depth: depth.length,
    children: []
  };
};

export const parseLines = (lines, values) =>
  lines.reduce((presets, line) => {
    const preset = parseLine(line, values);
    return preset ? presets.concat(preset) : presets;
  }, []);

export const parseList = (line, values) =>
  line
    .trim()
    .split(" ")
    .map(str => {
      const val = str.trim();
      if (val.slice(0, 1) === "$") return values[parseInt(val.slice(1))];
      else return parseValue(val);
    });

export const parseValue = value => {
  if (value === "on" || value === "yes" || value === "true") {
    return true;
  } else if (value === "off" || value === "no" || value === "false") {
    return false;
  } else if (/^[-\.\+]?[0-9]+\.?([0-9]+)?$/.test(value)) {
    return Number(value);
  }
  return value;
};

export const normilizeDepth = props => {
  const set = props[0].depth === 0 ? props.slice(1) : props;
  const depth = Math.min(...set.map(p => p.depth));
  return props.map(p => ({ ...p, depth: Math.max(0, p.depth - depth) }));
};

export const generateTree = props => {
  const presets = [...normilizeDepth(props)];
  let tree = [];

  for (let i = presets.length - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      let parent = presets[j];
      let child = presets[i];

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
  tree.unshift(presets[0]);
  return tree;
};

const Marklang = (strs, ...values) => {
  const markup = strs.reduce((mark, str, i) => (mark += `${str}$${i}`), "");
  const lines = markup.split("\n");
  const props = parseLines(lines, values);
  return generateTree(props);
};

export default Marklang;
