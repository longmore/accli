# accli 脚手架初始化工具

## 介绍
项目开发过程中，经常会把一些常用的工程方案的目录结构做成脚手架工程的形式，然后存放到git仓库，当你download下来之后，需要修改脚手架工程里面对应的信息。accli就是帮你管理脚手架以及初始化脚手架信息的工具，accli支持远程配置文件，随时更改你的脚手架选项及工程地址。

## 使用

- 全局安装`accli`，mac需要加sudo
``` npm install -g accli ```

- 此时输入` accli -v `查看版本

- accli命令说明

```
    accli --help // 查看帮助。等同 accli -h
    accli config --get // 显示当前配置文件地址，如果为空则是本地
    accli config --set http://git.corp.kuaishou.com/acfun-frontend/accli-config/blob/master/config/a.js // 设置配置文件地址

    accli init // 初始化脚手架

```

- 设置工具的远程配置，如果没有设置则走本地默认的配置文件
``` accli ```

## 效果图
<img src="./example/1.gif" style="display: inline-block; position: relative; width: 80%; height: auto;" />

## 配置文件


### 配置文件格式
配置文件支持js格式和json格式。
- js格式需要module.exports输出；
- json格式按照正常写即可；

### 配置文件示例（默认）

```
module.exports = {
    message: '请选择初始化类型',
    itemName: '创建{{ value }}服务',
    choices: [
        {
            value: 'nodejs',
            children: {
                message: '请选择nodejs类型',
                itemName: '创建{{ value }}类型',
                choices: [
                    {
                        value: 'egg-bigpipe-boilerplate',
                        repo: 'git@git.corp.kuaishou.com:acfun-frontend/egg-bigpipe-boilerplate.git'
                    },
                    {
                        value: 'egg-vue-ssr',
                        repo: 'git@git.corp.kuaishou.com:acfun-frontend/egg-bigpipe-boilerplate.git'
                    }
                ]
            }
        },
        {
            value: 'static',
            children: {
                message: '请选择static类型',
                choices: [
                    {
                        value: 'egg-bigpipe-boilerplate'
                    },
                    {
                        value: 'egg-vue-ssr'
                    }
                ]
            }
        }
    ]
};
```