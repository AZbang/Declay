# Templator
> New way of declarative description of entities using string templating and decorators

# Using

### Write your class using `Templator` decorator
```js
import Templator from 'templator';

@Templator
class Entity {
  constructor(name) {
    this.name = name;
  }

  sayHello(who) {
    console.log(`Hello ${who}! My name is ${this.name}`);
  }
}
```

### Now you can declare your class
```js
const vasya = Entity`
  @init Vasya

  old 20
  like ${['apple', 'banana']}
  likeCount @${({like}) => like.length}

  @sayHello Petya
`

> Hello Petya! My name is Vasya
> Entity {name: "Vasya", old: 20, like: Array(2), likeCount: 2}
    like: (2) ["apple", "banana"]
    likeCount: 2
    name: "Vasya"
    old: 20
```

# Why?
It seems to me that this approach will allow you to describe complex entities more succinctly and simply, 
which is useful, for example, in gamedev, when you need to declare entity with a lot of options and 
run different sequential scripts during object initialization.

# Plugins
All parameters in the template pass through internal plugins that can modify the incoming object. 
For this there is an API:
```js
import { addPlugin } from 'templator';

addPlugin(/@(log|error)/, (obj, value, match, /* match2, ...*/) => {
  console[match](value);
  return obj; // return modified object!
});

```

# Author
* **Andrey Zhevlakov | @azbang**
* **azbangwtf@ya.ru**
* **LICENCE MIT**