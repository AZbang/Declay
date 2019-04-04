import * as PIXI from 'pixi.js'
import { Templator, $ } from 'templator'

const App = Templator(PIXI.Application);
const Container = Templator(PIXI.Container);
const Sprite = Templator(PIXI.Sprite.fromImage);

const appW = window.innerWidth;
const appH = window.innerHeight;

App`
  @init ${appW} ${appH} ${{backgroundColor: 0xFF00FF}}
  append @${(app) => document.body.appendChild(app.view)}
`

Container`
  #scene // TODO

  @init
  @anchor.set .5
  @setParent ${app.stage}
`

Sprite`
  #player

  @init ./img.jpg
  @anchor.set .5 // TODO 
  @scale.set .3
  @position.set ${appW/2} ${appH/2}
  @setParent ${$.player}
`
