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

  let { fileIndexingArrObj, allElementsArr } = indexFile(fileInfo);

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

        // Map looper inside map looper that loops through breakPointSelection to configure
        // "sizes and srcset attribute" in each <source>
        breakPointSelection.map((y) => {

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
