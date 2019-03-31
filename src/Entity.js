const Templator = require('./Templator');

const Entity = (strs, ...values) => {
  const props = Templator(strs, ...values);
  const sprite = {};
  return Object.assign(sprite, props);
}

module.exports = Entity;