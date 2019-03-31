
const parseLine = (line) => {
  const depth = (line.match(/^[\t ]+/) || [''])[0]
  const [key, value] = line.replace(depth, '').split(' ');
  if(!key) return null;
  return {
    key,
    value: value != null ? parseValue(value) : true,
    depth: depth.length,
    children: [],
  }
}

const parseValue = (value) => {
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

const normilizeDepth = (props) => {
  const depth = Math.min(...props.map(p => p.depth));
  return ([...props]).map(p => ({...p, depth: p.depth-depth }));
}

const parseLines = (lines) =>
  lines.reduce((presets, line) => {
    const preset = parseLine(line);
    return preset ? presets.concat(preset) : presets;
  }, []);

const generateTree = (props) => {
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

const templateTree = (tree) => {
  const props = {};

  tree.forEach((prop) => {
    const args = prop.children.length ? templateTree(prop.children) : null;

    if(typeof prop.value === 'function') {
      try { props[prop.key] = new value(args) } 
      catch { props[prop.key] = prop.value(args) }

    } else if(typeof prop.value === 'object') {
      props[prop.key] = Object.assign({}, args, prop.value);
  
    } else {
      props[prop.key] = args || prop.value;
    }
  });

  return props;
}

const Templator = (strs, ...values) => {
  const presets = strs.reduce((res, str, i) => {
    const lines = str.split('\n');
    const props = normilizeDepth(parseLines(lines));
    const last = props[props.length-1];
    if(last) last.value = values[i];
    
    return res.concat(props);
  }, []);

  const tree = generateTree(presets);
  return templateTree(tree);
}

module.exports = Templator;