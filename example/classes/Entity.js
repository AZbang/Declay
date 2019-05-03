import { Sprite } from "../../src/pixi";
import Templator from "../../src/templator";

@Templator
class Entity extends Sprite {
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
