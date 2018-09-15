'use strict';

const inquirer = require('inquirer');
const download = require('./download');

const choiceModel = {
    async init(config) {
        await this.prompt(config);
    },

    async prompt(item) {
        await inquirer.prompt([{
            type: 'list',
            name: 'value',
            message: item.message,
            choices: item.choices
        }]).then(async res => {
            const value = res.value;
            let child = this.find(item.choices, value);
            if (child.children) {
                await this.prompt(child.children);
            } else {
                download.init(child);
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
    }

}
module.exports = choiceModel;
