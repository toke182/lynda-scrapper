const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const optionsMenu = require('./options-menu');

const DISCLAIMER_TEXT = `
Welcome to Lynda Scrapper.

Lynda Scrapper is a software to download videos from Lynda.com.\b
This software is intended to allow people to happily watch their courses 
under poor network conditions or completely offline, not to steal or to be used
for ilegal purposes.\b

Myself as the Author of this software, I am not responsible and I do not support any
illegal missuse of this software.\b

Author: Javier Prieto Diaz\b
Github: https://github.com/toke182
`;

const DISCLAIMER_QUESTION = [{
  name: 'isDisclaimerAccepted',
  type: 'list',
  message: 'Do you understand this?',
  choices: ['Yes', 'No'],
  default: 1
}];

const _exitProgram = () => {
  clear();
  console.log('Bye Bye...');
  process.exit();
};

module.exports = () => {
	clear();
	console.log(chalk.red(figlet.textSync('Lynda Scraper', {font: 'ANSI Shadow'})));
	console.log(DISCLAIMER_TEXT);
	return inquirer.prompt(DISCLAIMER_QUESTION)
    .then(({isDisclaimerAccepted}) =>  isDisclaimerAccepted === 'Yes' ? optionsMenu() : _exitProgram());
};