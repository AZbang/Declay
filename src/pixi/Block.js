import PIXI from "pixi.js";
import Templator from "../templator";

@Templator
class Block extends PIXI.Container {
  constructor() {
    super();
    this.graphic = new PIXI.Graphics();
    this.addChild(this.graphic);

    this._fill = "transparent";
    this._radius = 0;
    this.w = 200;
    this.h = 200;
  }
  __addEntities(children = []) {
    children.forEach(child => this.addChild(child(this)));
  }

  set fill(v) {
    this._fill = v;
    this.draw();
  }
  get fill() {
    return this._fill;
  }

  set radius(v) {
    this._radius = v;
    this.draw();
  }
  get radius() {
    return this._radius;
  }

  size(w, h) {
    this.w = w;
    this.h = h;
    this.draw();
  }

  draw() {
    this.graphic.clear();
    if (this.fill !== "transparent") {
      this.graphic.beginFill(this.fill);
      this.graphic.drawRoundedRect(0, 0, this.w, this.h, this.radius);
      this.graphic.endFill();
    }
  }
}

export default Block;
