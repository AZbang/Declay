# Templator
> New way of declarative description of entities using string templating and decorators
```js
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

# Why?
It seems to me that this approach will allow you to describe complex entities more succinctly and simply, 
which is useful, for example, in gamedev, when you need to declare entity with a lot of options and 
run different sequential scripts during object initialization. Example with Pixi.js in `example/pixi.js`

# Packages
* declay - templating and parsing your Declay structure
* declay-pixi - Declay wrap for Pixi.js
* declay-app - Declay mixins for game engine
* declay-example - Example game project writed on Declay

# TODO
1. Refactoring. Rewrite templator and parser **(WIP)**
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