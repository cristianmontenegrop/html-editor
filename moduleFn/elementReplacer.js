import { indexFile, writeOnFile } from './index.js';

export async function replaceElement(
  fileInfo

  // fileContent,
  // outputDirPath,
  // oldElement,
  // newElement,
  // selfEnclosed
) {
  // let fileToEditArray = [...fileToEdit];
  // console.log('fileToEdit: ');
  // console.dir(fileToEditArray);

  console.log('replaceElement() started executing');
  // console.log(
  //   'oldElement: ',
  //   fileInfo.oldElement,
  //   'newElement: ',
  //   fileInfo.newElement
  // );

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
  let { fileIndexingArrObj, allElementsArr } = await indexFile(
    fileInfo
    // fileContent,
    // oldElementBegining,
    // oldElementEnd,
    // selfEnclosed
  );
  // console.log(
  //   'newElementBegining: ',
  //   fileInfo.newElementBegining,
  //   'newElementEnd: ',
  //   fileInfo.newElementEnd
  // );
  // console.log('result from element Replacer.js is : ----->');
  // console.dir(fileIndexingArrObj, allElementsArr);

  let replacedElementsArray = fileIndexingArrObj.map(
    ({ result, propertiesArray }) => {
      let checkStringfromFileToEdit = '';
      let propertiesString = '';

      for (let i = 0; i < propertiesArray.length; i++) {
        if (propertiesArray[i]) {
          propertiesString += propertiesArray[i] + ' ';
        }
      }

      // for (
      //   let i = result.indexStart;
      //   i < result.indexStart + result.length;
      //   i++
      // ) {
      //   checkStringfromFileToEdit += allElementsInFile[i];
      // }

      let deletedString = allElementsArr.splice(
        result.arrIndexPosition,
        1,
        `${newElementBegining} ${propertiesString}${newElementEnd}`
      );
      // console.log('replacedElementSingle: ');
      // console.dir(
      //   `FabricatedFileString: ${checkStringfromFileToEdit} RemovedString: ${deletedString} oldString: ${result.elString} newString: ${newElementBegining} ${propertiesString}${newElementEnd} indexStart:${result.indexStart} result.length: ${result.length}`
      // );
      return;
    }
  );

  // const editedFile = allElementsArr.toString();
  let writeOnFileResponse = await writeOnFile({
    ...fileInfo,
    editedFileContent: allElementsArr,
  }).catch((err) => {
    console.log('Error!: ', err);
    return { replaceElementSuccess: false, writeOnFileResponse: null };
  });
  // console.log('editedFile: ');
  // console.dir(editedFile);

  console.log('replaceElement() finished executing');
  return {
    replaceElementSuccess: true,
    writeOnFileResponse: writeOnFileResponse,
  };
}
