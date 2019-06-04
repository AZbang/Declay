import PIXI from "pixi.js";
import Declay from "declay";

@Declay
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
