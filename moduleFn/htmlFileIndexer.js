// index the html file into an array of strings, by separating every element by the symbols <>
// import { readFile } from './index.js';
import fs from 'fs';

export function indexFile(fileInfo) {
  // console.log('indexFile() started executing');
  // console.log('fileInfo in htmlFileIndexer: ', fileInfo);
  let result = {};
  let propertiesArray = [];
  let allElementsArr = [];
  let elementRgx;
  let fileIndexingArrObj = {};
  let searchAllElementsArr;

  if (fileInfo.selfEnclosed) {
    // assembe Regular expression Constant that tailors towards finding a self enclosed element such as <img // />
    elementRgx = new RegExp(
      `${fileInfo.oldElementBegining}.+?${fileInfo.oldElementEnd.replaceAll(
        '/',
        '\\/'
      )}`,
      'gims'
    );
  } else {
    // Assemble Regular Expression Constant that tailors towards finding a self enclosed  <div    > ... </div>
    // this needs work!!!!
    elementRgx = new RegExp(`${fileInfo.oldElementBegining}.+?>`, 'gims');
  }

  //Regex constants for matching elements and attributes
  const allFileElementsRgx = new RegExp(`<.+?>`, 'gims');
  const classRgx = /(class="|').+?(?="|')/ims;
  const altRgx = /(alt="|').+?(?="|')/ims;
  const srcRgx = /(src=("|')).+?(?="|')/ims;
  const srcsetRgx = /(srcsetRgx=("|')).+?(?="|')/ims;
  const sizesRgx = /(sizes=("|')).+?(?="|')/ims;
  const idRgx = /(id="|').+?(?="|')/ims;
  const dataSrcRgx = /(data-src="|').+?(?="|')/ims;
  const heightRgx = /(height="|').+?(?="|')/ims;
  const widthRgx = /(width="|').+?(?="|')/ims;
  const loadingRgx = /(loading="|').+?(?="|')/ims;
  const crossoriginRgx = /(crossorigin="|').+?(?="|')/ims;
  const imgPathRgx = /(src="|src=').+?(?="|')/ims;
  // const imgPathRgx = /.*?(\/[\/\w\.]+)[\s\?]?/ims;
  // const imgLocalPathRgx = /(\/.*^(\.\w+)) /ims;
  const imgFileExtensionRgx = /^[\..+] /ims;

  //find match for ALL elements in original file, place them in searchAllElementsArr
  searchAllElementsArr = [
    ...fileInfo.inputFileContent.matchAll(allFileElementsRgx),
  ];

  //put ALL the file's elements into allElementsArr
  for (let i = 0; i < searchAllElementsArr.length; i++) {
    allElementsArr.push(searchAllElementsArr[i][0]);
  }

  // iterate through "searchAllElementsArr" and find all the matches for the attributes inside each, return
  fileIndexingArrObj = searchAllElementsArr.map((x, i) => {
    let elMatch = x[0].match(elementRgx);
    if (elMatch === null) {
      return null;
    }

    //assemble Object that finds match for possible attributes inside found element, Place into RESULT
    result = {
      alt: altRgx.test(elMatch[0]) ? elMatch[0].match(altRgx)[0] + '"' : false,
      crossorigin: crossoriginRgx.test(elMatch[0])
        ? elMatch[0].match(crossoriginRgx)[0] + '"'
        : false,
      class: classRgx.test(elMatch[0])
        ? elMatch[0].match(classRgx)[0] + '"'
        : false,
      dataSrc: dataSrcRgx.test(elMatch[0])
        ? elMatch[0].match(dataSrcRgx)[0] + '"'
        : false,
      height: heightRgx.test(elMatch[0])
        ? elMatch[0].match(heightRgx)[0] + '"'
        : false,
      id: idRgx.test(elMatch[0]) ? `${elMatch[0].match(idRgx)[0]}"` : false,
      loading: loadingRgx.test(elMatch[0])
        ? elMatch[0].match(loadingRgx)[0] + '"'
        : false,
      sizes: sizesRgx.test(elMatch[0])
        ? elMatch[0].match(sizesRgx)[0] + '"'
        : false,
      srcset: srcsetRgx.test(elMatch[0])
        ? elMatch[0].match(srcsetRgx)[0]
        : false,
      src:
        srcRgx.test(elMatch[0]) && !dataSrcRgx.test(elMatch[0])
          ? elMatch[0].match(srcRgx)[0] + '"'
          : false,
      width: widthRgx.test(elMatch[0])
        ? elMatch[0].match(widthRgx)[0] + '"'
        : false,
      elString: elMatch[0],
      verifyString: fileInfo.inputFileContent.substring(
        x.index,
        x.index + elMatch[0].length
      ),
      arrIndexPosition: i,
      indexStart: x.index,
      length: elMatch[0].length,
      imageSourcePath: elMatch[0].match(srcRgx)[0].split('="')[1],
      imageFileExtension: (/[^./\\]*$/.exec(result.imageSourcePath) || [''])[0],
    };

    //place found Attributes into propertiesArray
    propertiesArray = [
      result.alt,
      result.crossorigin,
      result.class,
      result.dataSrc,
      result.height,
      result.id,
      result.loading,
      result.sizes,
      result.src,
      result.srcset,
      result.width,
    ];

    return { result, propertiesArray };
  });

  //iterate through "fileIndexingArrObj" and remove those that had no match
  for (let i = 0; i < fileIndexingArrObj.length; i++) {
    if (fileIndexingArrObj[i] === null) {
      let deletedElement = fileIndexingArrObj.splice(i, 1);
      i--;
    }
  }

  return { fileIndexingArrObj, allElementsArr };
}
