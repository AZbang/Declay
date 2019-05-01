import path from "path";
import babel from "rollup-plugin-babel";
import { eslint } from "rollup-plugin-eslint";
import serve from "rollup-plugin-serve";
import html from "rollup-plugin-bundle-html";

export default [
  {
    input: "src/index.js",
    output: {
      file: "build/markus.js",
      format: "cjs"
    },
    plugins: [eslint(), babel()]
  },

  {
    input: "./example/index.js",
    output: {
      file: "./build/example.js",
      format: "iife"
    },
    plugins: [
      serve("build"),
      eslint(),
      babel(),
      html({
        template: "./example/index.html",
        filename: "index.html",
        dest: "./build"
      })
    ]
  }
];
