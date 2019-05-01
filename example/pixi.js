import { App, Container, Sprite } from 'templator/pixi'
import $ from 'templator/get

const appW = window.innerWidth;
const appH = window.innerHeight;

App`
  @init ${appW} ${appH} ${{backgroundColor: 0xFF00FF}}
  @append ${document.body}
`

Container`
  #scene

  @init
  @anchor.set .5
  @setParent ${app.stage}
`

Sprite`
  #player

  @init ./img.jpg
  @anchor.set .5
  @scale.set .3
  @position.set ${appW/2} ${appH/2}
  @setParent ${$.player}

  @tick ${(pl) => {
    $.scene.rotation += .01;
  }}

  @on keyup ${(pl) => {
    
  }}
`
