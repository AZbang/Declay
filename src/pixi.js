import PIXI from 'pixi.js'
import { Templator } from './Templator';

@Templator
export class App extends PIXI.Application {
  constructor(w, h, options) {
    super(w, h, options);
  }
  set width(w) {

  }
  set height(h) {

  }
  set color(v) {

  }
  append(parent) {
    parent.appendChild(this.view);
  }
}

@Templator
export const Spite = (texture) => {
  if (texture instanceof PIXI.Texture) return new PIXI.Sprite(texture);
  else PIXI.Spite.fromImage(texture);
}

export const Container = Templator(PIXI.Container);