// index the html file into an array of strings, by separating every element by the symbols <>
// import { readFile } from './index.js';
import fs from 'fs';

export async function indexFile(
  fileInfo
  // fileContent, oldElementBegining, oldElementEnd, selfEnclosed
) {
  console.log('indexFile() started executing');
  // console.log('fileInfo in htmlFileIndexer: ', fileInfo);
  let result = {};
  let propertiesArray = [];
  let allElementsArr = [];
  let allFileElementsRgxPattern = '';
  let elementRgx;
  let fileIndexingArrObj = {};
  let searchAllElementsArr;

  if (fileInfo.selfEnclosed) {
    //  <img  //  />
    elementRgx = new RegExp(
      `${fileInfo.oldElementBegining}.+?${fileInfo.oldElementEnd.replaceAll(
        '/',
        '\\/'
      )}`,
      'gims'
    );
  } else {
    // <div    > ... </div>
    elementRgx = new RegExp(`${fileInfo.oldElementBegining}.+?>`, 'gims');
  }

  // console.log(
  //   'oldElementBegining: ',
  //   fileInfo.oldElementBegining,
  //   'oldoldElementEnd: ',
  //   fileInfo.oldElementEnd
  // );

  // oldElementEnd = oldElementEnd.replaceAll('/', '\\/');
  // const allFileElementsRgx = new RegExp(`<\\s|\\w.+?>`, 'gims');
  const allFileElementsRgx = new RegExp(`<.+?>`, 'gims');
  const classRgx = /(class="|').+?(?="|')/ims;
  const altRgx = /(alt="|').+?(?="|')/ims;
  const srcRgx = /(src=("|')).+?(?="|')/ims;
  const srcsetRgx = /(srcsetRgx=("|')).+?(?="|')/ims;
  const sizesRgx = /(sizes=("|')).+?(?="|')/ims;
  const idRgx = /(id="|').+?(?="|')/ims;
  const dataSrcRgx = /(data-src="|').+?(?="|')/ims;
  const heightRgx = /(height="|').+?(?="|')/ims;
  const widthRgx = /(widtht="|').+?(?="|')/ims;
  const loadingRgx = /(loading="|').+?(?="|')/ims;
  const crossoriginRgx = /(crossorigin="|').+?(?="|')/ims;

  searchAllElementsArr = [
    ...fileInfo.inputFileContent.matchAll(allFileElementsRgx),
  ];

  for (let i = 0; i < searchAllElementsArr.length; i++) {
    allElementsArr.push(searchAllElementsArr[i][0]);
  }
  // for (let i = 0; i < searchAllElementsArr.length; i++) {
  //   // console.dir(searchAllElementsArr[i][0]);
  //   if (/<!--.+?-->/i.test(searchAllElementsArr[i][0]) === false) {
  //     // searchAllElementsArrFiltered.push(searchAllElementsArr[i][0]);
  //     searchAllElementsArrFiltered += searchAllElementsArr[i][0];
  //   }
  // }

  // console.log('searchAllElementsArr: ');
  // console.table(
  //   searchAllElementsArr.map((x) => {
  //     return x[0];
  //   })
  // );

  // console.log('elementRgx: ', elementRgx);
  // let fileIndexingArrObj = [...fileContent.matchAll(elementRgx)];
  // console.log('searchAllElementsArr Length: ', searchAllElementsArr.length);

  // console.table(searchAllElementsArrFiltered);
  // fileIndexingArrObj = [...searchAllElementsArr.matchAll(elementRgx)];
  // console.log('fileIndexingArrObj: ');
  // console.dir(fileIndexingArrObj);
  // fileIndexingArrObj = searchAllElementsArr.matchAll(elementRgx);
  // searchAllElementsArr.map((x) => {});

  fileIndexingArrObj = searchAllElementsArr.map((x, i) => {
    let elMatch = x[0].match(elementRgx);
    if (elMatch === null) {
      return null;
    }
    // console.log('element Match: ');
    // console.dir(elMatch);

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
        ? elMatch[0].match(widthRgx)[0] + '"'
        : false,
      id: idRgx.test(elMatch[0]) ? `${elMatch[0].match(idRgx)[0]}"` : false,
      loading: loadingRgx.test(elMatch[0])
        ? elMatch[0].match(loadingRgx)[0] + '"'
        : false,
      sizes: sizesRgx.test(elMatch[0])
        ? elMatch[0].match(sizesRgx)[0] + '"'
        : false,
      src:
        srcRgx.test(elMatch[0]) && !dataSrcRgx.test(elMatch[0])
          ? elMatch[0].match(srcRgx)[0] + '"'
          : false,
      srcset: srcsetRgx.test(elMatch[0])
        ? elMatch[0].match(srcsetRgx)[0]
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
    };
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

  let consoleResult1 = [];
  let consoleResult2 = [];
  // for (let i = 0; i < 7; i++) {
  //   consoleResult1 += fileIndexingArrObj[i];
  // }
  // console.dir(consoleResult1);
  // console.log(fileIndexingArrObj.length);
  for (let i = 0; i < fileIndexingArrObj.length; i++) {
    // console.log('i here is: ', i);

    // console.log('fileIndexArOb[i]: ', fileIndexingArrObj[i]);

    // console.log('fileIndexingArrObj.length', fileIndexingArrObj.length);
    if (fileIndexingArrObj[i] === null) {
      let deletedElement = fileIndexingArrObj.splice(i, 1);
      // console.log('deletedElememt: ', deletedElement);
      // console.log('if Triggered!');
      // console.log('fileIndexingArrObj.length', fileIndexingArrObj.length);
      // fileIndexingArrObj -= fileIndexingArrObj[i];
      i--;
      // console.log('i: ', i);
    }
    // console.log('fileIndexArOb[i] After: ');
    // console.dir(fileIndexingArrObj[i]);
  }

  // for (let i = 0; i < 7; i++) {
  //   consoleResult2 += fileIndexingArrObj[i];
  // }

  // console.log(
  //   'result is : ----->!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
  // );
  // console.dir(consoleResult2);
  console.log('indexFile() finished executing');
  // console.log('indexFile() final Result: ');
  // console.dir(fileIndexingArrObj);
  return { fileIndexingArrObj, allElementsArr };
}
