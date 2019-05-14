import PIXI from "pixi.js";
import Templator from "../templator";
import Element from "./Element";

@Templator
@Element
class TilingSprite extends PIXI.TilingSprite {
  constructor(texture) {
    if (typeof texture === "string") texture = PIXI.Texture.from(texture);
    super(texture);
  }
}

export default TilingSprite;
