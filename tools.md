<!--
 * @Author: zhangjicheng
 * @Date: 2021-03-04 19:51:21
 * @LastEditTime: 2021-11-18 10:38:39
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \cli-lerna\tools.md
 * 可以输入预定的版权声明、个性签名、空行等
-->

# vscode 调试nodejs typescript

## 安装npm依赖包

``` bash
> npm install typescript --save-dev
> npm install ts-node --save-dev
```

## 配置 tsconfig.json

主要是将 sourceMap 设置为true。

``` json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "noImplicitAny": true,
    "outDir": "./dist",
    "sourceMap": true
  },
  "include": [
    "src/**/*"
  ]
}

```

## 配置 launch.json

打开 DEBUG 界面，添加 配置
或者编辑 /.vscode/launch.json。

``` json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Current TS File",
      "type": "node",
      "request": "launch",
      "program": "${workspaceRoot}/node_modules/ts-node/dist/_bin.js",
      "args": [
          "${relativeFile}"
      ],
      "cwd": "${workspaceRoot}",
      "protocol": "inspector"
    }
  ]
}
```
