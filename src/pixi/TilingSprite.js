import PIXI from "pixi.js";
import Templator from "../templator";

@Templator
class TilingSprite extends PIXI.TilingSprite {
  constructor(texture) {
    if (typeof texture === "string") texture = PIXI.Texture.from(texture);
    super(texture);
  }
}

export default TilingSprite;
