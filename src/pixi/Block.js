import PIXI from "pixi.js";
import Templator from "../templator";

@Templator
class Block extends PIXI.Container {
  constructor() {
    super();
  }
  __addEntities(children = []) {
    children.forEach(child => this.addChild(child(this)));
  }
}

export default Block;
