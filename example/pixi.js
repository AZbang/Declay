import { App, Container, Sprite } from 'templator/pixi'
import $ from 'templator/get

const appW = window.innerWidth;
const appH = window.innerHeight;

App`#app

  @init ${appW} ${appH} ${{backgroundColor: 0xFF00FF}}
  @append ${document.body}
`

Container`#scene

  @init
  @anchor.set .5
  @setParent ${$.app.stage}
`

Sprite`#player

  @init ./img.jpg
  @anchor.set .5
  @scale.set .3
  @position.set ${appW/2} ${appH/2}
  @setParent ${$.scene}
`
