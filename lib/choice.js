'use strict';

const inquirer = require('inquirer');
const icon = require('log-symbols');
const chalk = require('chalk');
const fs = require('fs');

const Download = require('./download');
let config = require('../config');

const choiceModel = {
    init() {
        config = this.format(config);
        this.prompt(config);
    },

    prompt(item) {
        inquirer.prompt([{
            type: 'list',
            name: 'value',
            message: item.message,
            choices: item.choices
        }]).then(res => {
            const value = res.value;
            let child = this.find(item.choices, value);
            if (child.children) {
                this.prompt(child.children);
            } else {
                Download.init(child);
            }

        });
    },

    find(data, match) {
        let res = null;
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (item.value === match) {
                res = item;
                break;
            }
        }
        return res;
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

    }

}
choiceModel.init();
module.exports = choiceModel;
