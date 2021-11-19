/*
 * @Author: your name
 * @Date: 2021-11-19 11:20:47
 * @LastEditTime: 2021-11-19 15:02:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cli-lerna\packages\img-compress\webpack.config.ts
 */
// import * as webpack from "webpack";
import * as path from "path";
// import { CleanWebpackPlugin } from "clean-webpack-plugin";

module.exports = {
  target: "es5",
  mode: "production",
  entry: "./src/index.ts",
  output: {
    // filename: "index_[hash:8].js",
    filename: "index.js",
    path: path.resolve(__dirname, "lib"),
    library: {
      name: 'img-compress',
      type: 'umd', // 将你的 library 暴露为所有的模块定义下都可运行的方式
    },
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
  // plugins: [
  //   new CleanWebpackPlugin(),
  //   new webpack.BannerPlugin({
  //     banner: "#!/usr/bin/env node",
  //     raw: true,
  //     entryOnly: true,
  //     include: 'src/*'
  //   }),
  // ],
};
