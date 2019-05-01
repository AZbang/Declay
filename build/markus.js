'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var PIXI = _interopDefault(require('pixi.js'));

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var parseLine = function parseLine(line) {
  var depth = (line.match(/^[\t ]+/) || [""])[0];

  var _parseList = parseList(line.replace(depth, "")),
      _parseList2 = _toArray(_parseList),
      key = _parseList2[0],
      value = _parseList2.slice(1);

  if (!key) return null;
  return {
    line: line,
    key: key,
    value: value,
    depth: depth.length,
    children: []
  };
};
var parseList = function parseList(line) {
  return line.trim().split(" ").map(function (v) {
    return parseValue(v);
  });
};
var parseLines = function parseLines(lines) {
  var props = lines.reduce(function (presets, line) {
    var preset = parseLine(line);
    return preset ? presets.concat(preset) : presets;
  }, []);
  return normilizeDepth(props);
};
var parseValue = function parseValue(value) {
  if (value === "on" || value === "yes" || value === "true") {
    return true;
  } else if (value === "off" || value === "no" || value === "false") {
    return false;
  } else if (/^[-\.\+]?[0-9]+\.?([0-9]+)?$/.test(value)) {
    return Number(value);
  }

  return value;
};
var normilizeDepth = function normilizeDepth(props) {
  var depth = Math.min.apply(Math, _toConsumableArray(props.map(function (p) {
    return p.depth;
  })));
  return _toConsumableArray(props).map(function (p) {
    return _objectSpread({}, p, {
      depth: p.depth - depth
    });
  });
};
var generateTree = function generateTree(props) {
  var presets = _toConsumableArray(props);

  var tree = [];

  for (var i = presets.length - 1; i >= 0; i--) {
    for (var j = i - 1; j >= 0; j--) {
      var parent = presets[j];
      var child = presets[i];

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

var Marklang = function Marklang(strs) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  var presets = strs.reduce(function (res, str, i) {
    var lines = str.split("\n");

    if (lines[0] !== "") {
      var _last = res[res.length - 1];
      var list = lines.shift();
      var args = parseList(list);
      _last.value = _last.value.concat(args);
    }

    var props = parseLines(lines);
    var last = props[props.length - 1];
    if (last && values[i]) last.value.push(values[i]);
    return res.concat(props);
  }, []);
  return generateTree(presets);
};

var parser = /*#__PURE__*/Object.freeze({
  parseLine: parseLine,
  parseList: parseList,
  parseLines: parseLines,
  parseValue: parseValue,
  normilizeDepth: normilizeDepth,
  generateTree: generateTree,
  default: Marklang
});

var assign = function assign(entity, props) {
  var obj = entity;
  props.forEach(function (prop) {
    obj = assignProp(obj, prop);
    if (obj[prop.key] && prop.children.length) assign(obj[prop.key], prop.children);
  });
  return obj;
};
var assignProp = function assignProp(entity, prop) {
  for (var i = 0; i < plugins.length; i++) {
    var _plugins$i;

    var match = prop.line.match(plugins[i].pattern);
    if (match) return (_plugins$i = plugins[i]).do.apply(_plugins$i, [entity, prop].concat(_toConsumableArray(match.splice(1))));
  }

  if (prop.value.length) {
    var value = prop.value.length > 1 ? prop.value : prop.value[0];
    setProp(entity, prop.key, value);
  }

  return entity;
};
var getProp = function getProp(entity, prop) {
  return prop.split(".").reduce(function (temp, key) {
    return temp[key];
  }, entity);
};
var setProp = function setProp(entity, prop, value) {
  var keys = prop.split(".");
  var last = keys.pop();
  var entry = keys.reduce(function (temp, key) {
    if (_typeof(temp[key]) !== "object") temp[key] = {};
    return temp[key];
  }, entity);
  entry[last] = value;
};

var Templator = function Templator(entity) {
  return function (strs) {
    for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      values[_key - 1] = arguments[_key];
    }

    var props = Marklang.apply(void 0, [strs].concat(values));
    return assign(entity, props);
  };
};

var templator = /*#__PURE__*/Object.freeze({
  assign: assign,
  assignProp: assignProp,
  getProp: getProp,
  setProp: setProp,
  default: Templator
});

var plugins$1 = [];
var addPlugin = function addPlugin(expr, fn) {
  return plugins$1.push({
    pattern: expr,
    do: fn
  });
};
var removePlugin = function removePlugin(expr) {
  for (var i = 0; i < plugins$1.length; i++) {
    if (plugins$1[i].pattern == expr) return plugins$1.splice(i, 1);
  }
};

var plugins$2 = /*#__PURE__*/Object.freeze({
  plugins: plugins$1,
  addPlugin: addPlugin,
  removePlugin: removePlugin
});

var App =
/*#__PURE__*/
function (_PIXI$Application) {
  _inherits(App, _PIXI$Application);

  function App(w, h, options) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, w, h, options));
  }

  _createClass(App, [{
    key: "append",
    value: function append(parent) {
      parent.appendChild(this.view);
    }
  }, {
    key: "width",
    set: function set(w) {
      this.renderer.width = w;
    }
  }, {
    key: "height",
    set: function set(h) {
      this.renderer.height = h;
    }
  }, {
    key: "color",
    set: function set(v) {
      this.renderer.backgroundColor = v;
    }
  }]);

  return App;
}(PIXI.Application);

var Sprite = function Sprite(texture) {
  if (texture instanceof PIXI.Texture) return new PIXI.Sprite(texture);else PIXI.Spite.fromImage(texture);
};

var pixi = {
  App: Templator(App),
  Sprite: Templator(Sprite),
  Container: Templator(PIXI.Container)
};

var pixi$1 = /*#__PURE__*/Object.freeze({
  default: pixi
});

var $ = {};
var add = function add(el, selector) {
  $[selector] = el;
};
var remove = function remove(selector) {
  delete $[selector];
};

var get = /*#__PURE__*/Object.freeze({
  $: $,
  add: add,
  remove: remove
});

addPlugin("@init", function (ctor, _ref) {
  var value = _ref.value;
  if (typeof ctor !== "function") throw Error("Templator error: @init use only for function");
  var entity;

  try {
    entity = _construct(ctor, _toConsumableArray(value));
  } catch (e) {
    entity = ctor.apply(void 0, _toConsumableArray(value));
  }

  if (ctor._id) add(entity, ctor._id);
  return entity;
});
addPlugin(/^#(.+)/, function (obj, _ref2) {
  var key = _ref2.key;
  obj._id = key;
  return obj;
});
addPlugin(/@(.+)/, function (obj, _ref3) {
  var key = _ref3.key,
      value = _ref3.value;
  var method = getProp(obj, key.slice(1));
  if (typeof method !== "function") throw Error("Templator error: ".concat(key.slice(1), " is not a function"));
  method.apply(void 0, _toConsumableArray(value));
  return obj;
});
addPlugin(/(.+) @/, function (obj, _ref4) {
  var key = _ref4.key,
      value = _ref4.value;
  if (typeof value[1] !== "function") throw Error("Templator error: ".concat(value[1], " is not a function"));
  return Object.assign(obj, _defineProperty({}, key, value[1].bind(obj)(obj)));
});

var index = {
  templator: templator,
  plugins: plugins$2,
  parser: parser,
  pixi: pixi$1,
  get: get
};

module.exports = index;
