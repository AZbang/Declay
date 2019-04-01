import * as PIXI from 'pixi.js'
import Templator from 'templator'

const App = Templator(PIXI.Application);
const Container = Templator(PIXI.Container);
const Sprite = Templator(PIXI.Sprite.fromImage);

const appW = window.innerWidth;
const appH = window.innerHeight;

const app = App`
  @init ${appW} ${appH} ${{backgroundColor: 0xFF00FF}}
`
document.body.appendChild(app.view);

const container = Container`
  @init

  anchor
    @set .5

  @setParent ${app.stage}
`

const sprite = Sprite`
  @init ./img.jpg

  anchor
    @set .5
  
  scale
    @set .3

  position
    x ${appW/2}
    y ${appH/2}

  @setParent ${container}
`