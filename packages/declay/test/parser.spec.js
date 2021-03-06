import Marklang, { parseList } from "../src/Marklang";

describe("test parser functions", () => {
  describe("test parser string templator", () => {
    it("should return prop with children prop", () => {
      const props = Marklang`
        position 
          x ${10}
      `;
      expect(props).toEqual([
        {
          line: "        position ",
          key: "position",
          value: [],
          depth: 0,
          children: [
            {
              line: "          x ",
              key: "x",
              value: [10],
              depth: 2,
              children: []
            }
          ]
        }
      ]);
    });
  });

  it("test parseList", () => {
    expect(parseList(" 10 hello on   ")).toEqual([10, "hello", true]);
  });

  it("test concatTemplateStrings", () => {
    expect(concatTemplateStrings(["app ", "\n prop\n", " arg"])).toEqual(
      "app $1\n prop\n$2 arg"
    );
  });
});
