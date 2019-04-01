import Templator from './Templator';
import './plugins';

@Templator
class Entity {
  constructor(first, last) {
    this.firstName = first;
    this.lastName = last;
  }

  sayHello(who) {
    console.log(`Hello ${who}! My name is ${this.firstName}`);
  }
}


const vasya = Entity`
  @init Vasya Pupkin

  old 20 10 10
  like ${['apple', 'banana']}
  likeCount @${({like}) => like.length}

  @sayHello Petya
`

console.log(vasya);