import { indexFile, writeOnFile } from './index.js';
import rename from 'rename';

export async function replaceElement(fileInfo) {
  // console.log('replaceElement() started executing');
  // console.log('fileInfo in elementReplacer: ', fileInfo);

  const [oldElementBegining, oldElementEnd] = fileInfo.oldElement
    .replaceAll(' ', '')
    .split('*');
  const [newElementBegining, newElementEnd] = fileInfo.newElement
    .replaceAll(' ', '')
    .split('*');
  fileInfo = {
    oldElementBegining: oldElementBegining,
    oldElementEnd: oldElementEnd,
    newElementBegining: newElementBegining,
    newElementEnd: newElementEnd,
    ...fileInfo,
  };

  let { fileIndexingArrObj, allElementsArr } = await indexFile(fileInfo);

  let replacedElementsArray = fileIndexingArrObj.map(
    ({ result, propertiesArray }) => {
      let checkStringfromFileToEdit = '';
      let propertiesString = '';

      for (let i = 0; i < propertiesArray.length; i++) {
        if (propertiesArray[i]) {
          propertiesString += propertiesArray[i] + ' ';
        }
      }

      let deletedString = allElementsArr.splice(
        result.arrIndexPosition,
        1,
        `${newElementBegining} ${propertiesString}${newElementEnd}`
      );

      return;
    }
  );

  let writeOnFileResponse = await writeOnFile({
    ...fileInfo,
    editedFileContent: allElementsArr,
  }).catch((err) => {
    console.err('Error!: ', err);
    return { replaceElementSuccess: false, writeOnFileResponse: null };
  });

  // console.log('replaceElement() finished executing');
  return {
    replaceElementSuccess: true,
    writeOnFileResponse: writeOnFileResponse,
  };
}

export async function replaceImageToPicture(fileInfo) {
  let newElementBegining = '<picture';
  let newElementEnd = '>';
  let { imageTypeSelection, breakPointSelection } = fileInfo;

  //split the element to be replaced into 2 separate strings
  const [oldElementBegining, oldElementEnd] = fileInfo.element_to_replace
    .replaceAll(' ', '')
    .split('*');

  fileInfo = {
    oldElementBegining: oldElementBegining,
    oldElementEnd: oldElementEnd,
    ...fileInfo,
  };

  // console.log('fileInfo in replaceImageToPicture: ', fileInfo);

  //retrieves
  let { fileIndexingArrObj, allElementsArr } = indexFile(fileInfo);

  //
  // console.log('fileIndexingArrObj: ');
  // console.log(fileIndexingArrObj);

  // console.log('allElementsArr: ');
  // console.dir(allElementsArr);

  let replacedElementsArray = fileIndexingArrObj.map(
    ({ result, propertiesArray }) => {
      let checkStringfromFileToEdit = '';
      let propertiesString = '';
      let allSourcesString = '';

      for (let i = 0; i < propertiesArray.length; i++) {
        if (propertiesArray[i]) {
          propertiesString += propertiesArray[i] + ' ';
        }
      }

      // Map looper that iterates through imageTyperSelection to create the necessary <source> elements
      imageTypeSelection.map((x) => {
        let sourceElementSrcset = '';
        let sourceElementSizes = '';
        // x = 'avif' | 'webp' | 'jpeg'

        // Map looper inside map looper that loops through breakPointSelection to configure
        // "sizes and srcset attribute" in each <source>
        breakPointSelection.map((y) => {
          // {
          //     breakpoint_start: 0,
          //     breakpoint_end: 480,
          //     image_width: 480,
          //     suffix: '-xs',
          //   }

          if (y.breakpoint_end) {
            sourceElementSrcset += `${rename(result.imageSourcePath, {
              suffix: y.suffix,
              extname: '.' + x,
            })} ${y.breakpoint_end}w, `;
            sourceElementSizes += `(max-width: ${y.breakpoint_end}px)  ${y.breakpoint_end}px, `;
          } else {
            sourceElementSrcset += `${rename(result.imageSourcePath, {
              suffix: y.suffix,
              extname: '.' + x,
            })} ${y.breakpoint_start}w, `;
            sourceElementSizes += `(min-width: ${y.breakpoint_start}px) ${y.breakpoint_start}px, `;
          }
        });
        allSourcesString += `<source type="image/${x}" sizes="${sourceElementSizes}" srcset="${sourceElementSrcset}" /> \n`;
      });

      // This appends the newly constructed element and replaces it for the old one
      // in AllElementsArr
      let deletedString = allElementsArr.splice(
        result.arrIndexPosition,
        1,
        `${newElementBegining} ${propertiesString} ${newElementEnd} \n ${allSourcesString}  \n <img ${propertiesString} /> \n </picture>`
      );

      return;
    }
  );

  let writeOnFileResponse = await writeOnFile({
    ...fileInfo,
    editedFileContent: allElementsArr,
  }).catch((err) => {
    console.err('Error!: ', err);
    return { replaceElementSuccess: false, writeOnFileResponse: null };
  });

  // console.log('replaceElement() finished executing');
  return {
    replaceElementSuccess: true,
    writeOnFileResponse: writeOnFileResponse,
  };
}

// {
//   result: {
//     alt: false,
//     crossorigin: false,
//     class: 'class="lazy size-1"',
//     dataSrc: 'data-src="./src/img/Floral_Pattern_6000x6000.jpg"',
//     height: false,
//     id: false,
//     loading: false,
//     sizes: false,
//     srcset: false,
//     src: false,
//     width: false,
//     elString: '<img\n' +
//       '        class="lazy size-1"\n' +
//       '        data-src="./src/img/Floral_Pattern_6000x6000.jpg"\n' +
//       '      />',
//     verifyString: '<img\n' +
//       '        class="lazy size-1"\n' +
//       '        data-src="./src/img/Floral_Pattern_6000x6000.jpg"\n' +
//       '      />',
//     arrIndexPosition: 220,
//     indexStart: 14624,
//     length: 99,
//     imageSourcePath: './src/img/Floral_Pattern_6000x6000.jpg',
//     imageFileExtension: 'jpg'
//   },
//   propertiesArray: [
//     false,
//     false,
//     'class="lazy size-1"',
//     'data-src="./src/img/Floral_Pattern_6000x6000.jpg"',
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false
//   ]
// }

// fileInfo = {
//   oldElement: oldElement,
//   imageTypeSelection: imageTypeSelection,
//   breakPointSelection: breakPointSelection,
//   inputDirPath: inputDirPath,
//   inputDirRelativePath: './insert-file-here',
//   inputFileName: inputFileName,
//   inputFilePath: inputFilePath,
//   outputFileName: inputFileName,
//   outputFilePath: path.join(__dirname, './edited-file', inputFileName),
//   outputDirPath: path.join(__dirname, './edited-file'),
//   outputRelativeDirPath: './edited-file',
//   outputRelativeFilePath: path.join('./edited-file', inputFileName),
//   inputFileContent: await readFileContent(inputFilePath),
// };

// imageTypeSelection: ['avif', 'webp', 'img']
//breakPointSelection: ['0-480px', '481-768px', '769-1279px', '1280+px']
