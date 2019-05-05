import { App, TilingSprite, Scenes, Container, Text } from "../src/pixi/index";
import { repeat } from "../src/utils";
import $ from "../src/get";
import { enemy, player } from "./entities";

const width = window.innerWidth;
const height = window.innerHeight;

const app = App`#app
  @init ${width} ${height} ${{ backgroundColor: 0xff00ff }}
  @append ${document.body}

  ${Scenes`#scenes
    ${Container`#menu
      ${TilingSprite`
        @init 
        width ${width}
        height ${height}
        @on update ${self => (self.tile.x += 10)}
      `}
      ${Text`
        text | Start game
        @position.set ${width / 2} ${height / 2}
        @anchor.set .5
        @on click ${() => $.scenes.goto("#playground")}
      `}
    `}
    ${Container`#playground
      ${Text`
        text | Text node
        @position.set 20 20
        @anchor.set 0
        @on click ${() => $.scenes.goto("#menu")}
      `}
      ${player}
      ${repeat(10, i => enemy)}
    `}
  `}
`();
