import PIXI from "pixi.js";
import Templator from "../templator";
import Element from "./Element";

@Templator
@Element
class Scenes extends PIXI.Container {
  scenes = new Map();
  active = null;

  __addEntities(scenes = []) {
    scenes.forEach(scene => this.scenes.set(scene.id, scene));
  }
  goto(id, params) {
    if (this.active) this.removeChild(this.active);
    this.active = this.scenes.get(id)(this, params);
    this.addChild(this.active);
  }
  restart(params) {
    this.goto(this.active.id, params);
  }
}

export default Scenes;
