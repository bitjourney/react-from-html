"use strict";
const path = require('path');

const webpack = require("webpack");
const atLoader = require("awesome-typescript-loader");

module.exports = (env, argv) => {
  const config = {
    entry: "./src/index.ts",

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: `react-from-html.${argv.mode}.js`,
      libraryTarget: "commonjs",
    },

    resolve: {
      modules: ["src", "node_modules", "vendor-build"],
      extensions: [".js", ".ts", ".tsx"],
    },

    externals: {
      react: {
        commonjs: 'react',
      },
    },

    plugins: [
      new atLoader.CheckerPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1, // suppress code splitting
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(?:ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "awesome-typescript-loader",
            options: {
              configFileName: "tsconfig.webpack.json",
              useCache: true,
            },
          },
        },
      ],
    },

    devtool: "source-map",
  };

  return config;
};
