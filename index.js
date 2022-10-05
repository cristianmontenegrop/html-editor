import inquirer from 'inquirer';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  readFiles,
  readFileContent,
  replaceElement,
} from './moduleFn/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputDirPath = path.join(__dirname, './insert-file-here');
let fileInfo;
let inputFileName;
// let inputFileNamesArr;

var functionVar = {
  exit: function () {
    // inquirer
    //   .prompt([
    //     {
    //       type: 'confirm',
    //       message: 'do you wish to quit?',
    //       name: 'quit',
    //     },
    //   ])
    //   .then(({ quit }) => {
    //     if (quit) {
    //       return;
    //     } else {
    //       functionVar.greetings();
    //     }
    //   });
  },
  readAllFileNamesArr: async function () {
    // inputFileNamesArr = await readFiles(inputDirPath);
    // return inputFileNamesArr;
    // return await readFiles(inputDirPath)
  },
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
          setTimeout(() => functionVar.exit(), 1000);
        } else {
          functionVar.inputFileSelection();
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
        fileInfo = await functionVar.structureFileNameData(fileSelection);
        functionVar.elementsToReplace();
      });
  },
  elementsToReplace: async function () {
    //replacing prompt for information, disable later
    let { replaceElementSuccess, writeOnFileResponse } = await replaceElement({
      oldElement: '<img * />',
      newElement: '<yikes * />',
      selfEnclosed: true,
      ...fileInfo,
    });

    if (replaceElementSuccess) {
      console.log('Great!, all went along nicely');
      functionVar.goodbye(writeOnFileResponse);
    } else {
      functionVar.error(error);
    }
  },

  //   await inquirer
  //     .prompt([
  //       {
  //         type: 'confirm',
  //         message: 'is the element self closing? eg: <img />',
  //         name: 'selfEnclosed',
  //       },
  //       {
  //         type: 'input',
  //         message:
  //           'please write down the element that needs to be replaced, and an "*" where attributes go, all existing attributes will be kept',
  //         name: 'oldHtmlElement',
  //       },
  //       {
  //         type: 'input',
  //         message:
  //           'please write down the replacement html element, and an "*" where attributes go, all existing attributes will be kept',
  //         name: 'newHtmlElement',
  //       },
  //     ])
  //     .then(
  //       async ({
  //         isFileGood,
  //         oldHtmlElement,
  //         newHtmlElement,
  //         selfEnclosed,
  //       }) => {
  //         isFileGood
  //           ? (

  //             answer = await replaceElement(
  //               oldHtmlElement,
  //               newHtmlElement,
  //               selfEnclosed
  //             )

  //             )
  //           : console.err(
  //               'you need to paste the content into the variable!',
  //               prompt.complete()
  //             );

  //         // console.log('final answer in Inquirer: ');
  //         // console.table(answer);
  //         functionVar.goodbye();
  //       }
  //     );

  goodbye: async function (editedFileContent) {
    inquirer
      .prompt([
        {
          type: 'confirm',
          message: `how is this looking?: ${console.dir(editedFileContent)}`,
          name: 'confirmOutput',
        },
      ])
      .then(({ confirmOutput }) => {
        confirmOutput ? console.log('Done!, enjoy.') : functionVar.exit();
      })
      .catch((err) => {
        console.log('Oops!, something went wrong');
        throw err;
      });
  },
  error: function (error) {
    console.log(`Oh no!, something went wrong, here is the error: ${error} `);
    functionVar.exit();
  },
};

functionVar.greetings();
