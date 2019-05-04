export const parseLine = line => {
  const depth = (line.match(/^[\t ]+/) || [""])[0];
  const [key, ...value] = parseList(line.replace(depth, ""));

  return {
    line,
    key,
    value: value || [],
    depth: depth.length,
    children: []
  };
};

export const parseList = line => {
  return line
    .trim()
    .split(" ")
    .map(v => parseValue(v));
};

export const parseLines = lines => {
  const props = lines.reduce((presets, line) => {
    const preset = parseLine(line);
    return preset ? presets.concat(preset) : presets;
  }, []);

  return normilizeDepth(props);
};

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
  const depth = Math.min(...props.map(p => p.depth));
  return [...props].map(p => ({ ...p, depth: p.depth - depth }));
};

export const generateTree = props => {
  const presets = [...props];
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
  const presets = strs.reduce((res, str, i) => {
    const lines = str.split("\n");

    if (lines[0] !== "") {
      let last = res[res.length - 1];
      let list = lines.shift();
      let args = parseList(list);
      last.value = last.value.concat(args);
    }

    const props = parseLines(lines);
    const last = props[props.length - 1];

    if (values[i] && last) {
      if (last.key) last.value.push(values[i]);
      else last.entity = values[i];
    }

    return res.concat(props);
  }, []);

  return generateTree(presets);
};

export default Marklang;
