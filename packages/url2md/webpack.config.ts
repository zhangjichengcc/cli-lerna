/*
 * @Author: zhangjicheng
 * @Date: 2021-03-02 16:22:29
 * @LastEditTime: 2021-03-03 17:56:55
 * @LastEditors: zhangjicheng
 * @Description:
 * @FilePath: \cli-lerna\packages\url2md\webpack.config.ts
 * @可以输入预定的版权声明、个性签名、空行等
 */

import * as webpack from "webpack";
import * as path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

module.exports = {
  target: "node",
  mode: "production",
  entry: "./src/index.ts",
  output: {
    filename: "index_[hash:8].js",
    path: path.resolve(__dirname, "bin"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    // 需要打包的文件后缀
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin({
      banner: "#!/usr/bin/env node",
      raw: true,
      entryOnly: true,
      // include: 'src/*'
    }),
  ],
};
