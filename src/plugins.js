export const plugins = [];

export const addPlugin = (expr, fn) => plugins.push({ pattern: expr, do: fn });

export const removePlugin = expr => {
  for (let i = 0; i < plugins.length; i++) {
    if (plugins[i].pattern == expr) return plugins.splice(i, 1);
  }
};
