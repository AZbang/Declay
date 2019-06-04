# Declay

### Write your class using `Declay` decorator
```js
import Declay from 'declay';

@Declay
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
```

### Now you can declare your class
```js
const vasya = Entity`
  @init Vasya Pupkin

  old 20
  like ${['apple', 'banana']}
  likeCount @${({like}) => like.length}

  @sayHello Petya ${Date.now()}
`

> Hello Petya! My name is Vasya
> Time 1554155408549
> Entity {firstName: "Vasya", lastName: "Pupkin", old: 20, like: Array(2), likeCount: 2}
    firstName: "Vasya"
    lastName: "Pupkin"
    like: (2) ["apple", "banana"]
    likeCount: 2
    old: 20
```

# I dont use decorators
I understand... Well, then you have to do this:
```js
const Entity = Declay(EntityClass);
```
