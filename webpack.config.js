"use strict";
const path = require('path');

const webpack = require("webpack");

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
      extensions: [".ts", ".tsx", ".js"],
    },

    externals: {
      'react': {
        commonjs: 'react',
      },
      'crypto-js/sha1': {
        commonjs: 'crypto-js/sha1',
      },
      'crypto-js/enc-hex': {
        commonjs: 'crypto-js/enc-hex',
      },
    },

    plugins: [
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
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.webpack.json",
            },
          },
        },
      ],
    },

    devtool: "source-map",
  };

  return config;
};
