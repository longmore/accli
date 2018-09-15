#!/usr/bin/env node

'use strict';
const path = require('path');
const fs = require('fs');
const program = require('commander');
const chalk = require('chalk');
const choice = require('../lib/choice');
const pkg = require(path.join(__dirname, '../package.json'));

program
    .version(pkg.version, '-v, --version')

program
    .command('init')
    .option('-r, --registry [url]', '默认是 https://registry.npmjs.org, 可以只用快手私服: https://npm.corp.kuaishou.com')
    .description('初始化脚手架工具')
    .action(options => {
        choice.init(options);
    });

program.parse(process.argv);