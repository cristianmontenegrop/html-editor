import { indexFile, writeOnFile } from './index.js';

export async function replaceElement(fileInfo) {
  // console.log('replaceElement() started executing');

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
  // console.log('fileInfo in elementReplacer: ', fileInfo);
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
