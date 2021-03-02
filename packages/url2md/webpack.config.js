/*
 * @Author: zhangjicheng
 * @Date: 2021-03-02 16:22:29
 * @LastEditTime: 2021-03-02 19:59:07
 * @LastEditors: zhangjicheng
 * @Description: 
 * @FilePath: \cli-lerna\packages\url2md\webpack.config.js
 * @可以输入预定的版权声明、个性签名、空行等
 */

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index_[hash:8].js',
    path: path.resolve(__dirname, 'bin'),
  },
  target: 'node',
  mode: 'production'
};
