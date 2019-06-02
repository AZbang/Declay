import $ from "../src/get";
import { App, TilingSprite, Scenes, Block, Text } from "../src/pixi/index";
import { enemy, player } from "./entities";

const width = window.innerWidth;
const height = window.innerHeight;

App`#app
  >
    width ${width} 
    height ${height}
    backgroundColor 0xff00ff
    antialias on
  @append ${document.body}

  ${Scenes`#scenes
    @goto menu

    ${menu}
    ${Block`#playground
      @position.set ${width / 2} ${height / 2}
      @size 200 200
      @pivot.set 100 100
      graphic
        @beginFill 0x00FFFF
        @drawCircle 100 100 60
        @endFill

      interactive on
      buttonMode on
        
      @on pressed:D ${(self, dt) => (self.x += 10 * dt)}
      @on pressed:S ${(self, dt) => (self.y += 10 * dt)}
      @on pressed:W ${(self, dt) => (self.y -= 10 * dt)}
      @on tick ${(self, dt) => (self.rotation += 0.01 * dt)}
      @on click ${() => $.scenes.goto("menu")}

      ${Text`
        text Menu
        @position.set 100 100
        @anchor.set .5
      `}
    `}
  `}
`();

let sum = 0;
const Acc = (a) => {
  sum += a;
  return (b) => App(b);
};

Acc`
  > 1000
  > 340
  > 3402
  > 3252
`

Templator`
  $App
    $Scenes
      $Block#app

      $Block
    

`;