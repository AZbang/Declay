import Templator from 'templator';

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

const vasya = Entity`
  @init Vasya Pupkin

  old 20
  like ${['apple', 'banana']}
  likeCount @${({like}) => like.length}

  @sayHello Petya ${Date.now()}
`

console.log(vasya);
