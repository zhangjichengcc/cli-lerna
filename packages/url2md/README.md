<!--
 * @Author: zhangjicheng
 * @Date: 2021-03-04 11:28:56
 * @LastEditTime: 2021-03-04 14:31:33
 * @LastEditors: zhangjicheng
 * @Description: 
 * @FilePath: \cli-lerna\packages\url2md\README.md
 * 可以输入预定的版权声明、个性签名、空行等
-->

# `url_md`

拉取指定文章url并转为md文档，⚠️请用于由标准`markdown`编译而成的博客网站，如掘金，思否等   

注意：生成的markdown文档将保存在当前目录下

## USE

``` bash
# 安装
> npm install -g url_md

# 使用
> url_md -u https://*** 
```

## Options
``` bash
-v, --version  # 输出版本信息
-u, --url<url> # 传入目标文章的url
-h, --help     # 输出帮助文档
``` 
