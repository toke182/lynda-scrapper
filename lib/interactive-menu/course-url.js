const inquirer = require('inquirer');

const COURSE_URL_QUESTIONS = [
  {
    name: 'url',
    type: 'input',
    message: 'Enter course url:',
    validate: function( value ) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter course url';
      }
    }
  },
  {
    name: 'username',
    type: 'input',
    message: 'Enter your lynda account email:',
    validate: function( value ) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter correct email address';
      }
    }
  },
  {
    name: 'password',
    type: 'password',
    message: 'Enter your lynda account password:',
    validate: function( value ) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter correct email address';
      }
    }
  }
];

// Option #1
module.exports = () => inquirer.prompt(COURSE_URL_QUESTIONS);

