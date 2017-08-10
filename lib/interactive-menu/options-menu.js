const clear = require('clear');
const inquirer = require('inquirer');
const downloadCourse = require('../download');
const showSearchQuestion = require('./search-course');
const showCourseUrlQuestions = require('./course-url');

const OPTIONS_MENU_CHOICES = [
  	'Search course to download', 
  	'Download course pasting url'
];

const OPTIONS_MENU_QUESTION = [{
  name: 'menuOptionSelected',
  type: 'list',
  message: 'Ok cool, now what do you want to do?',
  choices: OPTIONS_MENU_CHOICES
}];

const _nextStep = ({menuOptionSelected}) => {
	switch (menuOptionSelected) {
		case OPTIONS_MENU_CHOICES[0]: {
			showSearchQuestion()
				.then((downloadData) => downloadCourse(downloadData));
			break;
		}
		case OPTIONS_MENU_CHOICES[1]: {
			showCourseUrlQuestions()
				.then((downloadData) => downloadCourse(downloadData));
			break;
		}
	}
}

module.exports = () => inquirer
	.prompt(OPTIONS_MENU_QUESTION)
	.then(_nextStep);