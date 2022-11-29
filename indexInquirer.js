import inquirer from 'inquirer';
import path from 'path';
import { fileURLToPath } from 'url';
import img from './gulpfile.js';
import {
  readFiles,
  readFileContent,
  replaceElement,
  replaceImageToPicture,
} from './moduleFn/index.js';

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

    // console.log(oldElement, newElement, selfEnclosed);
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
      // console.log('Great!, all went along nicely');
      fnObj.exit({ replaceElementSuccess, writeOnFileResponse });
    } else {
      fnObj.error();
    }
  },
  elementsToReplaceImgToPictureFullResponsive: async function () {
    let breakPointSelection = [];
    let {
      oldElement,
      imageTypeSelection,
      breakpointQuantity,
      do_you_need_image_conversion,
    } = await inquirer.prompt([
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
        type: 'number',
        name: 'breakpointQuantity',
        message: 'How many breakpoints do you need?',
      },
      {
        type: 'confirm',
        name: 'do_you_need_image_conversion',
        message: 'do you need to convert your image files as well?',
      },
    ]);

    const asyncIterable = {
      [Symbol.asyncIterator]() {
        let i = 0;
        return {
          next() {
            const done = i === breakpointQuantity;
            const value = done ? undefined : i++;
            return Promise.resolve({ value, done });
          },
          return() {
            return { done: true };
          },
        };
      },
    };

    for await (let num of asyncIterable) {
      breakPointSelection = [
        await inquirer.prompt([
          {
            type: 'number',
            name: `breakpoint_start`,
            message: `Please insert breakpoint ${num + 1} start`,
          },
          {
            type: 'number',
            name: `breakpoint_end`,
            message: `Please insert breakpoint ${num + 1} end`,
          },
          {
            type: 'number',
            name: `image_width`,
            message: `Please insert image ${num + 1} width`,
          },
          {
            type: 'input',
            name: `suffix`,
            message: `Please insert image ${num + 1} suffix (eg: -xs)`,
          },
        ]),
        ...breakPointSelection,
      ];
    }

    //execute image conversion bundle

    if (do_you_need_image_conversion) {
      await fnObj
        .createImageResponsiveObject({
          breakPointSelection: breakPointSelection,
          imageTypeSelection: imageTypeSelection,
        })
        .then((x) => {
          console.log('.then => img(x): ', x);
          try {
            img(x);
          } catch (error) {
            console.error('Please check the image_source path', error);
          }
        });
    }

    let { replaceElementSuccess, writeOnFileResponse } =
      await replaceImageToPicture({
        element_to_replace: oldElement,
        imageTypeSelection: imageTypeSelection,
        breakPointSelection: breakPointSelection,
        ...fileInfo,
      });

    if (replaceElementSuccess && writeOnFileResponse) {
      console.log('Great!, all went along nicely');
      fnObj.exit({ replaceElementSuccess, writeOnFileResponse });
    } else {
      fnObj.error();
    }
  },

  createImageResponsiveObject: async function ({
    imageTypeSelection,
    breakPointSelection,
  }) {
    let { image_source, image_destination } = await inquirer.prompt([
      {
        type: 'input',
        name: 'image_source',
        message: 'what is the image/s directory path?',
      },
      {
        type: 'input',
        name: 'image_destination',
        message: 'what is the image/s directory destination path?',
      },
    ]);

    let image_responsive_object = { formats: [] };
    imageTypeSelection.map((image_format) => {
      breakPointSelection.map(({ image_width, suffix }) => {
        image_responsive_object.formats.push({
          width: image_width,
          format: image_format,
          rename: { suffix: suffix },
        });
        return;
      });
      return;
    });
    console.log('image_responsive_object: ');
    console.dir(image_responsive_object.formats);
    return {
      image_source: image_source,
      image_destination: image_destination,
      ...image_responsive_object,
    };
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
