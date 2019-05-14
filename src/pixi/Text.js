import PIXI from "pixi.js";
import Templator from "../templator";
import Element from "./Element";

@Templator
@Element
class Text extends PIXI.Text {
  constructor(value) {
    super(value);
  }
}

export default Text;
