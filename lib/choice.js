'use strict';

const inquirer = require('inquirer');
const Download = require('./download');
const choices = require('../config').choices;

exports.init = options => {

    const deepNum = Object.keys(choices).length;
    let index = 1;

    function prompt(config) {
        inquirer.prompt([{
            type: 'list',
            name: 'value',
            message: config.message,
            choices: config.data
        }]).then(res => {
            const value = res.value;
            if (index < deepNum) {
                index++;
                prompt(choices[index][value]);
            } else {
                Download.init(value);
            }
        });
    }

    prompt(choices[index]);
}