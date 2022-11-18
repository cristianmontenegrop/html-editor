// import inquirer from 'inquirer';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import {
//   readFiles,
//   readFileContent,
//   replaceElement,
//   replaceImageToPicture,
// } from './moduleFn/index.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const inputDirPath = path.join(__dirname, './insert-file-here');
// let fileInfo;
// let inputFileName;

// var fnObj = {
//   structureFileNameData: async function (inputFileName) {
//     const inputFilePath = path.join(inputDirPath, inputFileName);

//     fileInfo = {
//       inputDirPath: inputDirPath,
//       inputDirRelativePath: './insert-file-here',
//       inputFileName: inputFileName,
//       inputFilePath: inputFilePath,
//       outputFileName: inputFileName,
//       outputFilePath: path.join(__dirname, './edited-file', inputFileName),
//       outputDirPath: path.join(__dirname, './edited-file'),
//       outputRelativeDirPath: './edited-file',
//       outputRelativeFilePath: path.join('./edited-file', inputFileName),
//       inputFileContent: await readFileContent(inputFilePath),
//     };
//     return fileInfo;
//   },
//   greetings: async function () {
//     await inquirer
//       .prompt([
//         {
//           type: 'confirm',
//           message:
//             'Hello! is the file in ./insert-file-here/ (you can insert it now by the way)?',
//           name: 'isFileGood',
//         },
//       ])
//       .then(async ({ isFileGood }) => {
//         if (!isFileGood) {
//           console.log('oh no!');
//           setTimeout(() => fnObj.exit(), 1000);
//         } else {
//           fnObj.inputFileSelection();
//         }
//       });
//   },
//   inputFileSelection: async function () {
//     inquirer
//       .prompt([
//         {
//           type: 'list',
//           message: 'Which of these files is it?',
//           choices: await readFiles(inputDirPath),
//           name: 'fileSelection',
//         },
//       ])
//       .then(async ({ fileSelection }) => {
//         console.log('fileSelection: ', fileSelection);
//         inputFileName = fileSelection;
//         fileInfo = await fnObj.structureFileNameData(fileSelection);
//         fnObj.selectAction();
//       });
//   },

//   selectAction: async function () {
//     let { actionSelection } = await inquirer.prompt([
//       {
//         type: 'list',
//         message: 'please select the type of action to perform.',
//         name: 'actionSelection',
//         choices: [
//           { name: 'one element into another', value: 'elementToElement' },
//           {
//             name: 'full fledge image responsive <img> to <picture>',
//             value: 'imgToPictureFullResponsive',
//           },
//         ],
//       },
//     ]);

//     if (actionSelection === 'elementToElement') {
//       fnObj.elementsToReplaceElementToElement();
//     } else if (actionSelection === 'imgToPictureFullResponsive') {
//       console.log('hello!');
//       fnObj.elementsToReplaceImgToPictureFullResponsive();
//     }
//   },
//   elementsToReplaceElementToElement: async function () {
//     let { oldElement, newElement, selfEnclosed } = await inquirer.prompt([
//       {
//         type: 'confirm',
//         message: 'is the element self closing? eg: <img />',
//         name: 'selfEnclosed',
//       },
//       {
//         type: 'input',
//         message:
//           'please write down the element that needs to be replaced, and an "*" where attributes go, all existing attributes will be kept',
//         name: 'oldElement',
//       },
//       {
//         type: 'input',
//         message:
//           'please write down the replacement html element, and an "*" where attributes go, all existing attributes will be kept',
//         name: 'newElement',
//       },
//     ]);

//     let { replaceElementSuccess, writeOnFileResponse } = await replaceElement({
//       oldElement,
//       newElement,
//       selfEnclosed,
//       ...fileInfo,
//     });

//     if (replaceElementSuccess && writeOnFileResponse) {
//       console.log('Great!, all went along nicely');
//       fnObj.exit({ replaceElementSuccess, writeOnFileResponse });
//     } else {
//       fnObj.error();
//     }
//   },
//   elementsToReplaceImgToPictureFullResponsive: async function () {
//     let { oldElement, imageTypeSelection, breakpointSelection } =
//       await inquirer.prompt([
//         {
//           type: 'input',
//           message:
//             'please write down the element that needs to be replaced, and an "*" where attributes go, all existing attributes will be kept',
//           name: 'oldElement',
//         },
//         {
//           type: 'checkbox',
//           name: 'imageTypeSelection',
//           message: 'Please select the output image types',
//           choices: ['avif', 'webp', 'jpg', 'png', 'gif', 'heif', 'tiff'],
//         },
//         {
//           type: 'checkbox',
//           name: 'breakpointSelection',
//           message: 'Please select the desired breakpoints',
//           choices: [
//             {
//               name: '0-480px - 481-768px - 769-1279px - 1280+px',
//               value: ['0-480px', '481-768px', '769-1279px', '1280+px'],
//             },
//             {
//               name: '0-767px - 768-1023px - 1024+px',
//               value: ['0-767px', '768-1023px', '1024+px'],
//             },
//           ],
//         },
//       ]);

//     let { replaceElementSuccess, writeOnFileResponse } =
//       await replaceImageToPicture({
//         oldElement: oldElement,
//         imageTypeSelection: imageTypeSelection,
//         breakpointSelection: breakpointSelection,
//         ...fileInfo,
//       });

//     if (replaceElementSuccess && writeOnFileResponse) {
//       console.log('Great!, all went along nicely');
//       fnObj.exit({ replaceElementSuccess, writeOnFileResponse });
//     } else {
//       fnObj.error();
//     }
//   },

//   error: function (error) {
//     console.log(`Oh no!, something went wrong, here is the error: ${error} `);
//     fnObj.exit();
//   },
//   exit: function () {
//     inquirer
//       .prompt([
//         {
//           type: 'confirm',
//           message: 'do you wish to quit?',
//           name: 'quit',
//         },
//       ])
//       .then(({ quit }) => {
//         if (quit) {
//           return;
//         } else {
//           fnObj.greetings();
//         }
//       });
//   },
// };

// fnObj.greetings();

import img from './gulpfile.js';

// if breakpoint_end is false, max-width is replaced by min-width
let your_needs = {
  breakpoints: [
    {
      breakpoint_start: 0,
      breakpoint_end: 480,
      image_width: 480,
      suffix: '-xs',
    },
    {
      breakpoint_start: 481,
      breakpoint_end: 768,
      image_width: 640,
      suffix: '-sm',
    },
    {
      breakpoint_start: 769,
      breakpoint_end: 1279,
      image_width: 768,
      suffix: '-md',
    },
    {
      breakpoint_start: 1280,
      breakpoint_end: false,
      image_width: 1024,
      suffix: '-lg',
    },
  ],
  image_formats: ['webp', 'avif', 'jpeg', 'tiff'],
  // Place an * where attributes go, only self enclosed elements currently accepted
  element_to_replace: '<img*/>',
  do_you_need_image_conversion: true,
  do_you_need_image_element_to_picture: false,
  html_file_source:
    '/Users/cristian/web-development/tools/file-editor/insert-file-here/file.html',
  html_file_destination:
    '/Users/cristian/web-development/tools/file-editor/edited-file/file.html',
  image_source:
    '/Users/cristian/web-development/professional-work/Lumontih/Lumontih/client/src/imgTest/*.jpg',
  image_destination:
    '/Users/cristian/web-development/professional-work/Lumontih/Lumontih/client/src/imgTest/output',
};

let createImageResponsiveObject = async function () {
  let formats_by_image_type_array = [];

  if (your_needs.do_you_need_image_conversion) {
    your_needs.image_formats.map((image_format) => {
      your_needs.breakpoints.map((y) => {
        formats_by_image_type_array = [
          {
            width: y.image_width,
            format: image_format,
            rename: { suffix: y.suffix },
          },
          ...formats_by_image_type_array,
        ];
      });
    });
    return { formats: formats_by_image_type_array };
  } else if (your_needs.do_you_need_image_element_to_picture) {
    let structureFileNameData = async function (your_needs) {
      // const inputFilePath = path.join(inputDirPath, inputFileName);

      let fileInfo = {
        inputFilePath: your_needs.html_file_source,
        outputRelativeFilePath: your_needs.html_file_destination,
        outputFilePath: your_needs.html_file_destination,
        inputFileContent: await readFileContent(your_needs.html_file_source),
        oldElement: your_needs.element_to_replace,
        imageTypeSelection: your_needs.image_formats,
        breakPointSelection: your_needs.breakpoints,
        ...your_needs,

        // inputDirPath: inputDirPath,
        // inputDirRelativePath: './insert-file-here',
        // inputFileName: inputFileName,
        // outputFileName: inputFileName,
        // outputDirPath: path.join(__dirname, './edited-file'),
        // outputRelativeDirPath: './edited-file',
      };

      return fileInfo;
    };

    structureFileNameData(your_needs).then(async (fileInfo) => {
      let { replaceElementSuccess, writeOnFileResponse } =
        await replaceImageToPicture({
          oldElement: oldElement,
          imageTypeSelection: imageTypeSelection,
          breakpointSelection: breakpointSelection,
          ...fileInfo,
        });
    });
  }
};

createImageResponsiveObject().then((x) => {
  x = {
    image_source: your_needs.image_source,
    image_destination: your_needs.image_destination,
    ...x,
  };
  img(x);
});
