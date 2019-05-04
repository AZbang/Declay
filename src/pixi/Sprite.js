import PIXI from "pixi.js";
import Templator from "../templator";

@Templator
class Sprite extends PIXI.Sprite {
  constructor(texture) {
    if (typeof texture === "string") texture = PIXI.Texture.from(texture);
    super(texture);
  }
}

export default Sprite;
