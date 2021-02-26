<!--
 * @Author: zhangjicheng
 * @Date: 2021-02-26 16:27:11
 * @LastEditTime: 2021-02-26 21:21:35
 * @LastEditors: zhangjicheng
 * @Description: 
 * @FilePath: \cli-lerna\README.md
 * @可以输入预定的版权声明、个性签名、空行等
-->
# `tax-mini-program`

税务移动端仓库，⚠️依赖统一使用 *[lerna](https://github.com/lerna/lerna)* 进行管理.

注意： 🌴 `packages` 文件夹中 **basic-components** 为其他模块依赖的公共组件

### leran 简单使用

**因为使用`lerna`进行包管理，依赖的安装和删除必须使用lerna 命令操作**

# Global Options
--loglevel       What level of logs to report.                                       
--concurrency    How many processes to use when lerna parallelizes tasks.             
--reject-cycles  Fail if a cycle is detected among dependencies.                            
--no-progress    Disable progress bars. (Always off in CI)                                    
--no-sort        Do not sort packages topologically (dependencies before dependents).        
--max-buffer     Set max-buffer (in bytes) for subcommand execution                              
-h, --help       Show help                                                                   
-v, --version    Show version number                                                          

## Command
### add:
`add <package> [globs..] [@version] [--dev] [--exact]  // Add a single dependency to matched packages`    
将单个依赖添加到匹配的包，默认所有包       
--dev devDependencies 替代 dependencies      
--exact 安装准确版本，就是安装的包版本前面不带^, Eg: "^2.20.0" ➜ "2.20.0"    
Examples:
``` bash
# 为packages/prefix-开头的模块添加module-1依赖
> lerna add module-1 packages/prefix-*

# 为module-2模块添加module-1依赖
> lerna add module-1 --scope=module-2

# Install module-1 to module-2 in devDependencies
> lerna add module-1 --scope=module-2 --dev

# Install module-1 in all modules except module-1
> lerna add module-1

# Install babel-core in all modules
> lerna add babel-core
```
       
### bootstrap:
`bootstrap [--exact] // Link local packages together and install remaining package dependencies`       
引导目前Lerna库的所有package，安装它们全部的依赖关系并连接任何相互交叉依赖的关系。     
lerna bootstrap respects the --ignore, --ignore-scripts, --scope and --include-filtered-dependencies

### changed:
`changed // List local packages that have changed since the last tagged release`      
列出自上次标记的版本以来已更改的本地包

### clean:
`clean // Remove the node_modules directory from all packages`     
删除所有包的 mode_modules 目录

### create:
`create <name> [loc]  // Create a new lerna-managed package`       
创建一个新的 lerna 管理包     
Example:
``` bash
# 根目录的package.json, 指定工作目录
'workspaces': [
  'packages/*',
  'packages/@jc3910/*'
]

# 创建一个包 package1 默认放在 workspaces[0] 所指位置
> lrena create package1

# 创建一个包 package2 指定放在 packages/@jc3910 文件夹下，注意必须在workspaces先写入packages/@jc3910
> lerna create package2 packages/@jc3910
```


### diff:
`diff [pkgName] // Diff all packages or a single package since the last release`     

### exec:
`exec -- [cmd] [args..] // Execute an arbitrary command in each package`     
执行任意命令在每一个包。
Examples:
``` bash
# 删除所有模块中的react-dom依赖
> lerna exec -- npm uninstall react-dom

# basic-components模块删除antd依赖
> lerna exec --scope=basic-components yarn remove antd

# 
```

### import：
`import <dir> // Import a package into the monorepo with commit history`      
将包导入具有提交历史记录的monorepo；导入本地已经存在的包


### info:
`info // Prints debugging information about the local environment`     
打印有关本地环境的调试信息   

### init：
`init // Create a new Lerna repo or upgrade an existing repo to the current version of Lerna`     
创建新的Lerna repo 或将现有的repo升级到当前版本的lerna

### link:
`link // Symlink together all packages that are dependencies of each other`            
项目包建立软链接，类似`npm link`  

### list:
`list // show all lerna packages`       
列出所有的包，如果与实际不符，进入相应包执行npm init -y 解决

### publish:
`publish [bump] // Publish packages in the current project.`     
发布当前包 npm/git
> Lerna不会发布标记为私有的软件包（"private": true在中package.json）。    

> 注意：要发布作用域包，您需要在每个包中添加以下内容package.json：
``` bash
"publishConfig": {
  "access": "public"
}
```

### run:
`run <script> // Run an npm script in each package that contains that script`     
在包含该脚本的每个包中运行一个npm脚本      
lerna run respects the --concurrency, --scope, --ignore, --stream, and --parallel flags    
lerna run遵循--concurrency、--scope、--ignore、--stream和--parallel标志

Example:
``` bash
# 执行 my-component 包中的 test 脚本 
> lerna run --scopt my-coponent test
```

### version:
`version [bump] // Bump version of packages changed since the last release.`         





另外可以安装tree插件生成目录文件树

```shell
# Mac OS 安装tree
brew install tree

# 生成树文件结构输出到tree.md
 tree -I 'node_modules' >tree.md
```

```text
.
├── README.md
├── lerna.json
├── package.json
├── packages
│   ├── apply-center  // 应用中心
│   │   └── package.json
│   ├── basic-components  // 公共组件
│   │   ├── README.md
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── chart-center  // 图表中心
│   │   └── package.json
│   ├── large-screen-center // 大屏中心
│   │   └── package.json
│   ├── person-center // 个人中心
│   │   └── package.json
│   ├── smart-home  // 智能首页
│   │   └── package.json
│   ├── system-management  // 系统管理
│   │   └── package.json
│   └── task-center   // 任务中心
│       ├── README.md
│       ├── app.config.js
│       ├── package.json
│       ├── public
│       ├── src
│       └── tsconfig.json
├── tree.md
├── types
│   ├── globals.d.ts
│   └── react-app.d.ts
└── yarn.lock
```