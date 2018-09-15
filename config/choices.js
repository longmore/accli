const chalk = require('chalk');

module.exports = {
    1: {
        message: '请选择初始化类型',
        data: [
            {
                name: `创建 ${chalk.green('nodejs')} 服务`,
                value: 'nodejs'
            },
            {
                name: `创建 ${chalk.green('纯前端')} 服务`,
                value: 'static'
            },
            {
                name: `创建 ${chalk.green('npm模块')} 服务`,
                value: 'module'
            }
        ]
    },
    2: {
        nodejs: {
            message: '请选择nodejs类型',
            data: [
                {
                    name: `创建 ${chalk.green('egg+tpl+bigpipe')} 项目脚手架`,
                    value: 'egg-bigpipe-boilerplate'
                },
                {
                    name: `创建 ${chalk.green('egg+vue+ssr')} 项目脚手架`,
                    value: 'egg-vue-ssr'
                }
            ]
        },
        static: {
            message: '请选择static类型',
            data: [
                {
                    name: `暂无，后续加入`,
                    value: 'none'
                }
            ]
        },
        module: {
            message: '请选择node模块类型',
            data: [
                {
                    name: `暂无，后续加入`,
                    value: 'none'
                }
            ]
        }
    }
};