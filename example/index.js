import { App, TilingSprite, Scenes, Block, Button } from "../src/pixi/index";
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

  ${Scenes`#scenes
    @goto menu

    ${Block`#menu
      fill 0xFFFFFF
      @size ${width} ${height}
      
      ${Button`
        @init ${"Start game"}
        @position.set ${width / 2} ${height / 2}
        @on click ${() => $.scenes.goto("playground")}
        @text.anchor.set .5
      `}
    `}
    ${Block`#playground
      @position.set ${width / 2 - 100} ${height / 2 - 100}
      @size 200 200
      fill 0x00FFFF
      radius 20

      ${Button`
        @init ${"Menu"}
        @position.set 20 20
        @on click ${() => $.scenes.goto("menu")}
      `}
    `}
  `}
`();

console.log($);
