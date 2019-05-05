import PIXI from "pixi.js";
import Templator from "../templator";

@Templator
class Button extends PIXI.Container {
  constructor(value) {
    super();
    this.buttonMode = true;
    this.interactive = true;

    this.text = new PIXI.Text(value);
    this.addChild(this.text);
  }
}

export default Button;
