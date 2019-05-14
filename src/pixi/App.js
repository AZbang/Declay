import PIXI from "pixi.js";
import Templator from "../templator";
import Element from "./Element";

@Templator
class App extends PIXI.Application {
  constructor(options = {}) {
    super(options);
    this.ticker.add(dt => this.__update(dt));
  }
  __update(dt) {
    for (let i = 0; i < this.stage.children.length; i++) {
      this.stage.children[i].__update && this.stage.children[i].__update(dt);
    }
  }
  __addEntities(entities = []) {
    entities.forEach(entity => this.stage.addChild(entity(this)));
  }
  append(parent) {
    parent.appendChild(this.view);
  }
}

export default App;
