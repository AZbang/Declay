import babel from "rollup-plugin-babel";
import { eslint } from "rollup-plugin-eslint";

export default [
  {
    input: "src/index.js",
    output: {
      file: "build/markus.js",
      format: "cjs"
    },
    plugins: [eslint(), babel()]
  }
];
