const fs = require('fs');
const path = require('path');
const icon = require('log-symbols');
const chalk = require('chalk');
const shell = require('shelljs');
const rimraf = require('mz-modules/rimraf');
const axios = require('axios');
const configPath = path.join(__dirname, '../.cliconfig');

module.exports = {
    init(options) {
        if (options.get) {
            this.getUrl();
            return;
        }
        this.setUrl(options);
    },

    getUrl() {
        const content = fs.readFileSync(configPath).toString();
        console.log(content);
    },

    setUrl(options) {
        if (/^http:\/\//.test(options) || /^git@git/.test(options)) {
            fs.writeFileSync(configPath, options);
            console.log(`${chalk.green('设置config地址：')}${options}`);
        } else {
            console.log(`${chalk.red('输入的config地址有误')}`);
        }

    },

    async get() {
        const url = fs.readFileSync(configPath).toString();
        let content = '';

        // .git仓库方式下载
        if (/\.git$/.test(url)) {
            const gitName = url.replace(/.*\/(.*)\.git$/, '$1');
            if (fs.existsSync(gitName)) {
                await rimraf(gitName);
            }
            await this.getConfigByGit(url, gitName);
            // 支持4个文件读取配置 index.js index.json config.js config.json
            if (fs.existsSync(path.join(process.cwd(), `${gitName}/index.js`))) {
                content = require(path.join(process.cwd(), `${gitName}/index.js`));
            }
            if (fs.existsSync(path.join(process.cwd(), `${gitName}/index.json`))) {
                content = require(path.join(process.cwd(), `${gitName}/index.json`));
            }
            if (fs.existsSync(path.join(process.cwd(), `${gitName}/config.js`))) {
                content = require(path.join(process.cwd(), `${gitName}/config.js`));
            }
            if (fs.existsSync(path.join(process.cwd(), `${gitName}/config.json`))) {
                content = require(path.join(process.cwd(), `${gitName}/config.json`));
            }
            await rimraf(gitName);

        }
        // .js/.json文件方式下载
        else if (/\.(js|json)$/.test(url)) {
            const gitRepo = url.replace(/(.*)\/blob\/.*\.(js|json)$/, '$1') + '.git';
            const gitName = gitRepo.replace(/.*\/(.*)\.git$/, '$1');
            const filePath = url.replace(/.*\/blob\/[^/]*\/(.*)$/, '$1');
            if (fs.existsSync(gitName)) {
                await rimraf(gitName);
            }
            await this.getConfigByGit(gitRepo, gitName);

            // 支持4个文件读取配置 index.js index.json config.js config.json
            if (fs.existsSync(path.join(process.cwd(), `${gitName}/${filePath}`))) {
                content = require(path.join(process.cwd(), `${gitName}/${filePath}`));
            }

            await rimraf(gitName);

        }
        else {
            content = require('../config');
        }

        content = this.format(content);
        return content;
    },

    format(data) {
        if (!data.choices.length) {
            console.log(icon.fail, chalk.green('请配置choices选项'));
        }
        const reg = /(.*)\{\{[^\[\]]*\}\}(.*)/;
        for (let choice of data.choices) {
            if (reg.test(data.itemName)) {
                choice.name = data.itemName.replace(/(.*)\{\{[^\[\]]*\}\}(.*)/, `$1${chalk.green(choice.value)}$2`)
            } else {
                choice.name = choice.value;
            }

            if (choice.children) {
                choice.children = this.format(choice.children);
            }
        }
        delete data.itemName;
        return data;

    },

    getConfigByGit(repo, name) {
        return new Promise((resolve, reject) => {
            shell.exec(`git clone ${repo}`, (err, stdout) => {
                if (err) {
                    console.log(icon.error, chalk.red('config下载出错'));
                    reject(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
}