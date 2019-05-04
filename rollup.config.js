import babel from "rollup-plugin-babel";
import { eslint } from "rollup-plugin-eslint";
import serve from "rollup-plugin-serve";
import html from "rollup-plugin-bundle-html";

export default [
  {
    input: "./example/index.js",
    external: ["pixi.js"],
    output: {
      file: "./build/example.js",
      format: "iife",
      globals: {
        "pixi.js": "PIXI"
      }
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
    ],
    watch: {
      include: "./**",
      exclude: "node_modules/**"
    }
  }
];
