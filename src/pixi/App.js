import PIXI from "pixi.js";
import Templator from "../templator";

class App extends PIXI.Application {
  constructor(w, h, options) {
    super(w, h, options);
  }

  __addEntities(entities = []) {
    entities.forEach(entity => this.stage.addChild(entity(this)));
  }

  set width(w) {
    this.renderer.width = w;
  }
  set height(h) {
    this.renderer.height = h;
  }
  set color(v) {
    this.renderer.backgroundColor = v;
  }
  append(parent) {
    console.log(this);
    parent.appendChild(this.view);
  }
}

export default Templator(App);
