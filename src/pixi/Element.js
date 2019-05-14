import key from "./keymaster";

const Element = target => {
  if (!target.prototype.__update)
    target.prototype.__update = function(dt) {
      const keys = key.getPressedKeyCodes();
      keys.map(key =>
        this.emit(`pressed:${String.fromCharCode(key)}`, this, dt)
      );
      this.emit("tick", this, dt);

      for (let i = 0; i < this.children.length; i++) {
        this.children[i].__update && this.children[i].__update(dt);
      }
    };

  if (!target.prototype.__addEntities)
    target.prototype.__addEntities = function(children = []) {
      children.forEach(child => this.addChild(child(this)));
    };
};

export default Element;
