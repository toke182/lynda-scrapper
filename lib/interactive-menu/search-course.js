const inquirer = require('inquirer');
const rp = require('request-promise-native');
const cheerio = require('cheerio');
const downloadCourse = require('../download');

let suggestions = [];

const SEARCH_COURSE_QUESTION = [{
  name: 'keyword',
  type: 'input',
  message: 'Introduce your Search:',
  validate: function( value ) {
    if (value.length) {
      return true;
    } else {
      return 'Please enter course url';
    }
  }
}];

const SUGGESTED_LIST = [{
  name: 'suggestion',
  type: 'list',
  message: 'This are lynda suggested courses:'
}];

const LOGIN_QUESTIONS = [
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
const _showSuggestions = ($) => {
  $('.course > a')
    .each((idx, a) => {
      const sug = {
        courseTitle: $(a).find('.title-author-info h2').text().replace(/(\n|\t)/g, ''),
        href: $(a).attr('href'),
      };
      suggestions.push(sug)
    });

  SUGGESTED_LIST[0].choices = suggestions.map((sug) => sug.courseTitle);

  return inquirer.prompt(SUGGESTED_LIST);
};

const _genDownloadPayload = ({suggestion}) => {
  const selectedCourse = suggestions
    .find(sug => sug.courseTitle === suggestion);

  return _requestLoginData()
    .then(loginData => {
      return Object.assign({}, loginData, {url: selectedCourse.href});
    });
};

const _searchByKeyword = (searchKeyword) => {
  const options = {
    uri: `https://www.lynda.com/ajax/search?q=${searchKeyword}`,
    transform: function (body) {
      return cheerio.load(JSON.parse(body).html);
    },
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  };

  return rp(options);
};

const _requestLoginData = () => inquirer.prompt(LOGIN_QUESTIONS);
module.exports = () => inquirer.prompt(SEARCH_COURSE_QUESTION)
  .then(({keyword}) => _searchByKeyword(keyword))
  .then(_showSuggestions)
  .then(_genDownloadPayload)
  .catch((err) => console.log('[SEARCH_API] Error: ', err));