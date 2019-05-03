import { Sprite } from "../../src/pixi";
import Templator from "../../src/templator";

@Templator
class Level extends Container {
  constructor(parent) {
    this.parent = parent;
    this.map = 1;
    this.health = 10;
  }

  // render declarative enitites
  __addView(entities = []) {
    entities.forEach(entity => this.addChild(entity(this)));
  }

  renderMap(map) {}
}

export default Entity;
