'use strict';

const fs = require('fs');
const ora = require('ora');
const icon = require('log-symbols');
const chalk = require('chalk');
const shell = require('shelljs');
const rename = require('./rename');

const downloadModel = {
    async init({ value, repo }) {
        const name = value;
        // 判断是否文件夹已经存在，避免覆盖
        if (fs.existsSync(name)) {
            console.log(icon.error, chalk.red(`${name}文件夹已经存在`));
            return;
        }

        // 配置是否正确
        if (!repo) {
            console.log(icon.error, chalk.red(`配置错误，请到config文件夹正确配置`));
            return;
        }

        const res = await this.download(repo, name);
        if (!res) {
            return;
        }
        rename.init(name);

    },

    download(repo, name) {
        let loading = ora(`下载 ${name}...`);
        loading.start();
        return new Promise((resolve, reject) => {
            shell.exec(`git clone ${repo}`, (err, stdout) => {
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
            });
        });
    }
};
module.exports = downloadModel;
