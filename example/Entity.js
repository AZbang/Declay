import Templator from "src/templator";

@Templator
class Entity {
  constructor(first, last) {
    this.firstName = first;
    this.lastName = last;
  }

  sayHello(who, time) {
    console.log(`Hello ${who}! My name is ${this.firstName}`);
    console.log(`Time ${time}`);
  }
}

export default Entity;
