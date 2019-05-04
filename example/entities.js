import Entity from "./classes/Entity";

const enemy = Entity`
  @init
  x @${() => Math.random() * 1000}
  y @${() => Math.random() * 1000}

  @flow repeat
    @move top
    @delay 1000
    @move left
    @delay 1000
    @move bottom
    @delay 1000
    @move right
`;

const player = Entity`
  @init
  x 10
  y 10

  @on press A ${self => self.left()}
  @on press D ${self => self.right()}
  @on press W ${self => self.top()}
  @on press S ${self => self.bottom()}
`;

export { enemy, player };
