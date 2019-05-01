import PIXI from "pixi.js";
import Templator from "./templator";

class Application extends PIXI.Application {
  constructor(w, h, options) {
    super(w, h, options);
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
    parent.appendChild(this.view);
  }
}

const PixiSprite = texture => {
  if (texture instanceof PIXI.Texture) return new PIXI.Sprite(texture);
  else PIXI.Spite.fromImage(texture);
};

export const App = Templator(Application);
export const Sprite = Templator(PixiSprite);
export const Container = Templator(PIXI.Container);
