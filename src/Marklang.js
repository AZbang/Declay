export const parseLine = (line) => {
  const depth = (line.match(/^[\t ]+/) || [''])[0]
  const [key, ...values] = line.replace(depth, '').split(' ');
  if(!key) return null;
  return {
    line,
    key,
    value: values.map(v => parseValue(v)),
    depth: depth.length,
    children: [],
  }
}

export const parseLines = (lines) => {
  const props = lines.reduce((presets, line) => {
    const preset = parseLine(line);
    return preset ? presets.concat(preset) : presets;
  }, []);

  return normilizeDepth(props);
}

export const parseValue = (value) => {
  if(value === 'on' || value === 'yes' || value === 'true') {
    return true;
  }
  else if(value === 'off' || value === 'no' || value === 'false') {
    return false;
  }
  else if(/^[-\.\+]?[0-9]+\.?([0-9]+)?$/.test(value)) {
    return Number(value);
  }
  return value;
}

export const normilizeDepth = (props) => {
  const depth = Math.min(...props.map(p => p.depth));
  return ([...props]).map(p => ({...p, depth: p.depth-depth }));
}

export const generateTree = (props) => {
  const presets = [...props];
  let tree = [];

  for(let i = presets.length-1; i >= 0; i--) {
    for(let j = i-1; j >= 0; j--) {
      let parent = presets[j];
      let child = presets[i];

      if(child.depth === 0) {
        tree.unshift(child);
        break;
      }
      if(parent.depth < child.depth) {
        parent.children.unshift(child);
        break;
      }
    }
  }
  tree.unshift(presets[0])
  return tree;  
}

const Marklang = (strs, ...values) => {
  const presets = strs.reduce((res, str, i) => {
    const lines = str.split('\n');
    const props = parseLines(lines);
    const last = props[props.length-1];
    if(last && values[i]) last.value = values[i];
    
    return res.concat(props);
  }, []);

  return generateTree(presets);
}

export default Marklang;