import { Block, Text } from "declay-pixi";

const playground = Block`#playground
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
  @on click ${(self) => self.parent.goto("menu")}

  ${Text`
    text Menu
    @position.set 100 100
    @anchor.set .5
  `}
`;

export default playground;
