import inquirer from 'inquirer';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  readFiles,
  readFileContent,
  replaceElement,
  replaceImageToPicture,
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
        fnObj.selectAction();
        // fnObj.elementsToReplace();
      });
  },

  selectAction: async function () {
    let { actionSelection } = await inquirer.prompt([
      {
        type: 'list',
        message: 'please select the type of action to perform.',
        name: 'actionSelection',
        choices: [
          { name: 'one element into another', value: 'elementToElement' },
          {
            name: 'full fledge image responsive <img> to <picture>',
            value: 'imgToPictureFullResponsive',
          },
        ],
      },
    ]);

    if (actionSelection === 'elementToElement') {
      fnObj.elementsToReplaceElementToElement();
    } else if (actionSelection === 'imgToPictureFullResponsive') {
      console.log('hello!');
      fnObj.elementsToReplaceImgToPictureFullResponsive();
    }
  },
  elementsToReplaceElementToElement: async function () {
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
  elementsToReplaceImgToPictureFullResponsive: async function () {
    let { oldElement, imageTypeSelection, breakpointSelection } =
      await inquirer.prompt([
        {
          type: 'input',
          message:
            'please write down the element that needs to be replaced, and an "*" where attributes go, all existing attributes will be kept',
          name: 'oldElement',
        },
        {
          type: 'checkbox',
          name: 'imageTypeSelection',
          message: 'Please select the output image types',
          choices: ['avif', 'webp', 'jpg', 'png', 'gif', 'heif', 'tiff'],
        },
        {
          type: 'checkbox',
          name: 'breakpointSelection',
          message: 'Please select the desired breakpoints',
          choices: [
            {
              name: '0-480px - 481-768px - 769-1279px - 1280+px',
              value: ['0-480px', '481-768px', '769-1279px', '1280+px'],
            },
            {
              name: '0-767px - 768-1023px - 1024+px',
              value: ['0-767px', '768-1023px', '1024+px'],
            },
          ],
        },
      ]);

    let { replaceElementSuccess, writeOnFileResponse } =
      await replaceImageToPicture({
        oldElement: oldElement,
        imageTypeSelection: imageTypeSelection,
        breakpointSelection: breakpointSelection,
        //replacing prompt for information, disable later
        // oldElement: '<img * />',
        ...fileInfo,
      });

    if (replaceElementSuccess && writeOnFileResponse) {
      console.log('Great!, all went along nicely');
      fnObj.exit({ replaceElementSuccess, writeOnFileResponse });
    } else {
      fnObj.error();
    }
  },

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

import { src, dest } from 'gulp';
import sharpResponsive from 'gulp-sharp-responsive';


// if breakpoint_end is false, max-width is replaced by min-width
let your_needs = {
  breakpoints: [
    {
      breakpoint_start: 0,
      breakpoint_end: 480,
      image_width: 480,
      suffix: 'xs',
    },
    {
      breakpoint_start: 481,
      breakpoint_end: 768,
      image_width: 640,
      suffix: 'sm',
    },
    {
      breakpoint_start: 769,
      breakpoint_end: 1279,
      image_width: 768,
      suffix: 'md',
    },
    {
      breakpoint_start: 1280,
      breakpoint_end: false,
      image_width: 1024,
      suffix: 'lg',
    },
  ],
  image_formats: ['webp', 'avif', 'jepg', 'tiff', 'gif'],
  do_you_need_image_conversion: true,
  image_source:
    '/Users/cristian/web-development/professional-work/Lumontih/Lumontih/client/src/imgTest/*.jpg',
  image_destination:
    '/Users/cristian/web-development/professional-work/Lumontih/Lumontih/client/src/imgTest/output',
};


if (do_you_need_image_conversion) {
  let formats = your_needs.breakpoints.map((breakpoint_object)=>{
    breakpoint_object

    return {};
  })
  // let formats = {
  //   formats: [
  //     { width: 480, format: 'jpeg', rename: { suffix: '-xs' } },
  //     { width: 640, format: 'jpeg', rename: { suffix: '-sm' } },
  //     { width: 768, format: 'jpeg', rename: { suffix: '-md' } },
  //     { width: 1024, format: 'jpeg', rename: { suffix: '-lg' } },

  //     { width: 480, format: 'webp', rename: { suffix: '-xs' } },
  //     { width: 640, format: 'webp', rename: { suffix: '-sm' } },
  //     { width: 768, format: 'webp', rename: { suffix: '-md' } },
  //     { width: 1024, format: 'webp', rename: { suffix: '-lg' } },

  //     { width: 480, format: 'avif', rename: { suffix: '-xs' } },
  //     { width: 640, format: 'avif', rename: { suffix: '-sm' } },
  //     { width: 768, format: 'avif', rename: { suffix: '-md' } },
  //     { width: 1024, format: 'avif', rename: { suffix: '-lg' } },
  //   ],
  // };
  const img = () =>
    src(your_needs.image_source)
      .pipe(sharpResponsive(formats))
      .pipe(dest(your_needs.image_destination));

  module.exports = { img };
}
