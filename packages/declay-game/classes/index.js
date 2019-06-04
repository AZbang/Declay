import Entity from "./Entity";

const enemy = Entity`
  > ${1} ${2} ${3} 4 5
  x @${() => Math.random() * 1000}
  y @${() => Math.random() * 1000}
`;

const player = Entity`
  @position.set 10 10
  @on press A ${self => self.left()}
  @on press D ${self => self.right()}
  @on press W ${self => self.top()}
  @on press S ${self => self.bottom()}
`;

export { enemy, player };
