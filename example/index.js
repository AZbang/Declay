import { App, TileSprite, Scenes, Container, Text } from "../src/pixi";
import { repeat } from "../src/utils";
import $ from "../src/get";

import { enemy, player } from "./entities";

App`#app
  @init ${{ backgroundColor: 0xff00ff }}
  width ${window.innerWidth}
  height ${window.innerHeight}
  @append ${document.body}

  ${Scenes`#scenes
    ${Container`#menu
      ${TileSprite`
        @init 
        width ${$.app.width}
        height ${$.app.height}
        @on update ${self => (self.tile.x += 10)}
      `}
      ${Text`
        text | Start game
        @position.set ${$.app.width / 2} ${$.app.height / 2}
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
