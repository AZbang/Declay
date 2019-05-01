import PIXI from "pixi.js";
import Templator from "./templator";

class App extends PIXI.Application {
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

const Sprite = texture => {
  if (texture instanceof PIXI.Texture) return new PIXI.Sprite(texture);
  else PIXI.Spite.fromImage(texture);
};

export default {
  App: Templator(App),
  Sprite: Templator(Sprite),
  Container: Templator(PIXI.Container)
};
