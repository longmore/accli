'use strict';

const ora = require('ora');
const download = require('git-clone');
const icon = require('log-symbols');
const chalk = require('chalk');
const repos = require('../config/index.js').repos;
const rename = require('./rename');
const fs = require('fs');
const shell = require('shelljs');

module.exports = {
    async init(name) {
        // 判断是否文件夹已经存在，避免覆盖
        if (fs.existsSync(name)) {
            console.log(icon.error, chalk.red(`${name}文件夹已经存在`));
            return;
        }

        // 配置是否正确
        const url = repos[name] && repos[name].url;
        if (!url) {
            console.log(icon.error, chalk.red(`配置错误，请到config文件夹正确配置`));
            return;
        }
        const res = await this.download(url, name);
        if (!res) {
            return;
        }
        rename.init(name);

    },

    download(url, name) {
        let loading = ora(`下载 ${name}...`);
        loading.start();
        return new Promise((resolve, reject) => {
            shell.exec(`git clone ${url}`, (err, stdout) => {
                if (err) {
                    loading.fail();
                    console.log(icon.error, chalk.red(err));
                    reject(false);
                }
                else {
                    loading.text = '模板下载成功~';
                    loading.succeed();
                    resolve(true);
                }
            })
        });
    }
};
