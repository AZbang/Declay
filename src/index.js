import Templator from './Templator';
import './plugins';

@Templator
class Entity {
  constructor(name) {
    this.name = name;
  }

  sayHello(who) {
    console.log(`Hello ${who}! My name is ${this.name}`);
  }
}


const vasya = Entity`
  @init Vasya

  old 20
  like ${['apple', 'banana']}
  likeCount @${({like}) => like.length}

  @sayHello Petya
`

console.log(vasya);