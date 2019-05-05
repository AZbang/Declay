import PIXI from "pixi.js";
import Templator from "../templator";

class App extends PIXI.Application {
  constructor(options = {}) {
    console.log(options);
    super(options);
  }

  __addEntities(entities = []) {
    entities.forEach(entity => this.stage.addChild(entity(this)));
  }
  append(parent) {
    parent.appendChild(this.view);
  }
}

export default Templator(App);
