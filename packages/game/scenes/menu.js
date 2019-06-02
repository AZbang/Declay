export default
Block`#menu
  fill 0xFFFFFF
  @size ${width} ${height}
  
  ${Block`
    @on click ${() => $.scenes.goto("playground")}
    @position.set ${width / 2} ${height / 2}
    @size 200 200
    @pivot.set 100 100
    fill 0x000000
    radius 80
    interactive on
    buttonMode on
    ${Text`
      text | Start game
      @position.set 100 100
      @anchor.set .5
      style
        fill white
    `}
  `}

  ${Block`
    @on click ${() => $.scenes.goto("playground")}
    @position.set 200 200
    @size 200 200
    @pivot.set 100 100
    fill 0x000000
    radius 80
    interactive on
    buttonMode on
    ${Text`
      text 
        | Hello 
        | Bitch!
  
      @position.set 100 100
      @anchor.set .5
      style
        align center
        fill white
    `}
  `}
`