#!/usr/bin/env node

'use strict';
const path = require('path');
const program = require('commander');
const choice = require('../lib/choice');
const pkg = require(path.join(__dirname, '../package.json'));
const shell = require('shelljs');
const configModel = require('../lib/config');

program
    .version(pkg.version, '-v, --version')

program
    .command('init')
    .option('-r, --registry [url]', '默认是 https://registry.npmjs.org, 可以只用快手私服: https://npm.corp.kuaishou.com')
    .description('初始化脚手架工具')
    .action(async () => {
        const configContent = await configModel.get();
        choice.init(configContent);
    });

program
    .command('config')
    .option('--get', '获取配置文件')
    .option('--set', '设置配置文件')
    .description('配置config项')
    .action(options => {
        configModel.init(options);
    });

// 如果没有传参数，显示help
if (process.argv.length <= 2) {
    shell.exec('node ./bin/cli.js -h');
}

program.parse(process.argv);