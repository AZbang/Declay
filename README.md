# Templator
> New way of declarative description of entities using string templating and decorators
```js
// Pixi.js declarative app
App`#app
  @init 
    backgroundColor 0xff00ff
  @append ${document.body}

  ${Scenes`#scenes
    @goto menu

    ${Block`#menu
      fill 0xFFFFFF

      ${Button`
        @init ${"Start game"}
        @position.set ${width / 2} ${height / 2}
        @on click ${() => $.scenes.goto("playground")}
        @text.anchor.set .5
      `}
    `}
    ${Block`#playground
      fill 0x00FFFF

      ${Button`
        @init ${"Menu"}
        @position.set 20 20
        @on click ${() => $.scenes.goto("menu")}
      `}
    `}
  `}
`();
```


# Using

### Write your class using `Templator` decorator
```js
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

# Why?
It seems to me that this approach will allow you to describe complex entities more succinctly and simply, 
which is useful, for example, in gamedev, when you need to declare entity with a lot of options and 
run different sequential scripts during object initialization. Example with Pixi.js in `example/pixi.js`

# I dont use decorators
I understand... Well, then you have to do this:
```js
const TemplateEntity = Templator(EntityClass);
```

# Plugins
All parameters in the template pass through internal plugins that can modify the incoming object. 
For this there is an API:
```js
import { addPlugin } from 'templator/plugins';

addPlugin(/@(log|error)/, (obj, { key, value }, match, /* match2, ...*/) => {
  console[match](value);
  return obj; // return modified object!
});

```

# TODO
1. Refactoring. Rewrite templator and parser
2. Add mixins suport, like
```js
  Enity`
    @${PlayerBehavior}
    @${SolidBody} 10 10 50 50 // yeah, mixin arguments!
```
3. Add subfunctions for callback support, like
```js
  Entity`
    @on click
      ${self => self.wow()}
      @method1
      @do2 
  `
```
4. Pixi.js full support
5. Write cool demo!
6. Add flow methods with promises support, like
```js
  Entity`
    @flow
      @method
      @hello // wait complete 'method'
      @goodbuy // wait complete 'hello' 
  `
```
# Author
* **Andrey Zhevlakov | @azbang**
* **azbangwtf@ya.ru**
* **LICENCE MIT**