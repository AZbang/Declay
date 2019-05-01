import { App, Container, Sprite } from "../src/pixi";
import $ from "../src/get";
import Entity from "./Entity";

const appW = window.innerWidth;
const appH = window.innerHeight;

App`
  #app
  @init ${appW} ${appH} ${{ backgroundColor: 0xff00ff }}
  @append ${document.body}
`;

Container`
  #scene
  @init
  @anchor.set .5
  @setParent ${$.app.stage}
`;

Sprite`
  #player
  @init ./img.jpg
  @anchor.set .5
  @scale.set .3
  @position.set ${appW / 2} ${appH / 2}
  @setParent ${$.scene}
`;

const vasya = Entity`
  @init Vasya Pupkin

  old 20
  like ${["apple", "banana"]}
  likeCount @${({ like }) => like.length}

  @sayHello Petya ${Date.now()}
`;

console.log(vasya);
