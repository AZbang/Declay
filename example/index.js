import { App, TilingSprite, Scenes, Block, Text } from "../src/pixi/index";
import { repeat } from "../src/utils";
import $ from "../src/get";
import { enemy, player } from "./entities";

const width = window.innerWidth;
const height = window.innerHeight;

const app = App`#app
  @init 
    width ${width} 
    height ${height}
    backgroundColor 0xff00ff
  @append ${document.body}

  pos
    x 10
    y 20

  ${Scenes`#scenes
    @goto menu

    ${Block`#menu
      ${Text`
        text | Start game
        interactive on
        buttonMode on
        @position.set ${width / 2} ${height / 2}
        @anchor.set .5
        @on click ${() => $.scenes.goto("playground")}
      `}
    `}
    ${Block`#playground
      ${Text`
        text | Text node
        @position.set 20 20
        @anchor.set 0
        interactive on
        buttonMode on
        @on click ${() => $.scenes.goto("menu")}
      `}
    `}
  `}
`();

console.log($);
