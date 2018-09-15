const fs = require('fs');
const inquirer = require('inquirer');
const icon = require('log-symbols');
const chalk = require('chalk');
const ora = require('ora');
const handlebars = require('handlebars');
const shell = require('shelljs');

module.exports = {

    async init(name) {

        if (!name || !fs.existsSync(name)) {
            console.log(icon.error, chalk.red(`${name} 文件夹不存在`));
        }
        const info = await this.getInput();
        const pkgFile = `${name}/package.json`;
        const gitDir = `./${name}/.git`;
        const content = fs.readFileSync(pkgFile).toString();
        const result = handlebars.compile(content)(info);
        fs.writeFileSync(pkgFile, result);
        shell.rm('-rf', gitDir);
        console.log(icon.success, chalk.green('模板下载成功~'));

        const isInstall = await this.getComfirm();

        if (isInstall) {
            let loading = ora('安装依赖中...');
            loading.start();
            shell.exec(`cd ${name} && npm i`, (err, stdout, stderr) => {
                if (err) {
                    loading.fail();
                    console.log(icon.error, chalk.red(err));
                }
                else {
                    loading.text = '安装成功～';
                    loading.succeed();
                    console.log(icon.success, chalk.green('脚手架初始化成功'));
                }
            });
        } else {
            console.log(icon.info, chalk.yellow('需要手动安装依赖'));
            console.log(icon.success, chalk.green('脚手架初始化成功'));
        }

    },

    getInput() {
        return inquirer.prompt([
            {
                name: 'name',
                message: '输入工程名称'
            },
            {
                name: 'desc',
                message: '输入描述信息'
            },
            {
                name: 'author',
                message: '输入作者'
            }
        ]).then(res => {
            return {
                name: res.name || '',
                desc: res.desc || '',
                author: res.author || ''
            }
        });
    },

    getComfirm() {
        return inquirer.prompt([
            {
                type: 'confirm',
                name: 'value',
                message: '是否马上安装node模块依赖?',
                default: true
            }
        ]).then(res => {
            return res.value;
        });
    }

};