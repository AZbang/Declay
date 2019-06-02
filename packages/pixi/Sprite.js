import PIXI from "pixi.js";
import Templator from "../templator";
import Element from "./Element";

@Templator
@Element
class Sprite extends PIXI.Sprite {
  constructor(texture) {
    if (typeof texture === "string") texture = PIXI.Texture.from(texture);
    super(texture);
  }
}

export default Sprite;
