import inquirer from 'inquirer';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  readFiles,
  readFileContent,
  replaceElement,
} from './moduleFn/index.js';
import util from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputDirPath = path.join(__dirname, './insert-file-here');
let fileInfo;
let inputFileName;
// let inputFileNamesArr;

var fnObj = {
  structureFileNameData: async function (inputFileName) {
    const inputFilePath = path.join(inputDirPath, inputFileName);
    // console.log('readFilesResponse: ', readFilesResponse);
    // console.log('inputFilePath: ', inputFilePath);
    // console.log('file content: ', readFileContentResponse);
    fileInfo = {
      inputDirPath: inputDirPath,
      inputDirRelativePath: './insert-file-here',
      inputFileName: inputFileName,
      inputFilePath: inputFilePath,
      outputFileName: inputFileName,
      outputFilePath: path.join(__dirname, './edited-file', inputFileName),
      outputDirPath: path.join(__dirname, './edited-file'),
      outputRelativeDirPath: './edited-file',
      outputRelativeFilePath: path.join('./edited-file', inputFileName),
      inputFileContent: await readFileContent(inputFilePath),
    };
    // console.log('fileInfo in index.js: ', fileInfo);
    return fileInfo;
  },
  greetings: async function () {
    await inquirer
      .prompt([
        {
          type: 'confirm',
          message:
            'Hello! is the file in ./insert-file-here/ (you can insert it now by the way)?',
          name: 'isFileGood',
        },
      ])
      .then(async ({ isFileGood }) => {
        if (!isFileGood) {
          console.log('oh no!');
          setTimeout(() => fnObj.exit(), 1000);
        } else {
          fnObj.inputFileSelection();
        }
      });
  },
  inputFileSelection: async function () {
    inquirer
      .prompt([
        {
          type: 'list',
          message: 'Which of these files is it?',
          choices: await readFiles(inputDirPath),
          name: 'fileSelection',
        },
      ])
      .then(async ({ fileSelection }) => {
        console.log('fileSelection: ', fileSelection);
        inputFileName = fileSelection;
        fileInfo = await fnObj.structureFileNameData(fileSelection);
        fnObj.elementsToReplace();
      });
  },
  elementsToReplace: async function () {
    let { oldElement, newElement, selfEnclosed } = await inquirer.prompt([
      {
        type: 'confirm',
        message: 'is the element self closing? eg: <img />',
        name: 'selfEnclosed',
      },
      {
        type: 'input',
        message:
          'please write down the element that needs to be replaced, and an "*" where attributes go, all existing attributes will be kept',
        name: 'oldElement',
      },
      {
        type: 'input',
        message:
          'please write down the replacement html element, and an "*" where attributes go, all existing attributes will be kept',
        name: 'newElement',
      },
    ]);

    // console.log('final answer in Inquirer: ');
    // console.table(answer);
    // fnObj.goodbye();
    // });

    console.log(oldElement, newElement, selfEnclosed);
    let { replaceElementSuccess, writeOnFileResponse } = await replaceElement({
      oldElement,
      newElement,
      selfEnclosed,
      //replacing prompt for information, disable later
      // oldElement: '<img * />',
      // newElement: '<yikes * />',
      // selfEnclosed: true,
      ...fileInfo,
    });

    if (replaceElementSuccess && writeOnFileResponse) {
      console.log('Great!, all went along nicely');
      fnObj.exit({ replaceElementSuccess, writeOnFileResponse });
    } else {
      fnObj.error();
    }
  },

  // goodbye: async function ({ replaceElementSuccess, writeOnFileResponse }) {
  //   if (replaceElementSuccess && writeOnFileResponse) {
  //     let outFileContent = await readFileContent(fileInfo.outputFilePath);
  //     inquirer
  //       .prompt([
  //         {
  //           type: 'confirm',

  //           message: `how is this looking?: ${console.dir(outFileContent)}`,
  //           name: 'confirmOutput',
  //         },
  //       ])
  //       .then(({ confirmOutput }) => {
  //         confirmOutput ? console.log('Done!, enjoy.') : fnObj.exit();
  //       })
  //       .catch((err) => {
  //         console.err('Oops!, something went wrong');
  //         throw err;
  //       });
  //   }
  // },

  error: function (error) {
    console.log(`Oh no!, something went wrong, here is the error: ${error} `);
    fnObj.exit();
  },
  exit: function () {
    inquirer
      .prompt([
        {
          type: 'confirm',
          message: 'do you wish to quit?',
          name: 'quit',
        },
      ])
      .then(({ quit }) => {
        if (quit) {
          return;
        } else {
          fnObj.greetings();
        }
      });
  },
};

fnObj.greetings();
