import { App, Scenes } from "declay-pixi";
import { enemy, player } from "./classes/entities";
import { menu, playground } from "./scenes";

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
    ${playground}
  `}
`();