import PIXI from "pixi.js";
import Templator from "../../src/templator";

@Templator
class Entity extends PIXI.Sprite {
  constructor(parent) {
    this.parent = parent;
    this.speed = 1;
    this.health = 10;
  }

  top() {}
  left() {}
  right() {}
  bottom() {}
}

export default Entity;
