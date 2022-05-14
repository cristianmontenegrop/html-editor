import inquirer from 'inquirer';
import { replaceElement } from './moduleFn/index.js';

let answer;

inquirer
  .prompt([
    {
      type: 'confirm',
      message:
        "Hello! is the file's content pasted in the variable in ./insert-file-here/file.js?",
      name: 'isFileGood',
    },
    {
      type: 'input',
      message:
        'please write down the element that needs to be replaced, and an "*" where attributes go, all present attributes will be kept',
      name: 'oldHtmlElement',
    },
    {
      type: 'input',
      message:
        'please write down the replacement html element, and an "*" where attributes go, all present attributes will be kept',
      name: 'newHtmlElement',
    },
  ])
  .then(({ isFileGood, oldHtmlElement, newHtmlElement }) => {
    isFileGood
      ? (answer = replaceElement(oldHtmlElement, newHtmlElement))
      : console.log('you need to paste the content into the variable!');

    // console.log(file);
  });
