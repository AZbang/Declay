const { Entity } = require('../src');

const prop = { x: 10, y: 20 };
const func = ({a, b}) => a+b;

const Player = Entity`
  position ${prop}
    a 10
  hp
    b 10
  flag on
  damage 20
    prop1 hello
    prop2 hello2
  flat2
  texture ${3}
  method ${func}
    a 10
    b 20
  tween ${{ x: 3 }}
  
  @updateText ${22-34}
`

Player.position.x += 10
console.log(Player);