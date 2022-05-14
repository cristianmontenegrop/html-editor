// index the html file into an array of strings, by separating every element by the symbols <>
import { fileToEdit } from './index.js';

export function indexFile({ elementStart, elementEnd }) {
  let result = {};

  console.log();
  // const imgRgx = /<img.+?\/>/gims;
  const elementRgx = new Regex(`${elementStart}.+?${elementEnd}`, 'gims');
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

  let fileIndexingArrObj = [...fileToEdit.matchAll(elementRgx)];

  fileIndexingArrObj = fileIndexingArrObj.map((x) => {
    result = {
      alt: altRgx.test(x[0]) ? x[0].match(altRgx)[0] + '"' : null,
      crossorigin: crossoriginRgx.test(x[0])
        ? x[0].match(crossoriginRgx)[0] + '"'
        : null,
      class: classRgx.test(x[0]) ? x[0].match(classRgx)[0] + '"' : null,
      dataSrc: dataSrcRgx.test(x[0])
        ? 'data-src="' + x[0].match(dataSrcRgx)[0] + '"'
        : null,
      height: heightRgx.test(x[0]) ? x[0].match(widthRgx)[0] + '"' : null,
      id: idRgx.test(x[0]) ? `${x[0].match(idRgx)[0]}"` : null,
      loading: loadingRgx.test(x[0]) ? x[0].match(loadingRgx)[0] + '"' : null,
      sizes: sizesRgx.test(x[0]) ? x[0].match(sizesRgx)[0] + '"' : null,
      src:
        srcRgx.test(x[0]) && !dataSrcRgx.test(x[0])
          ? 'src="' + x[0].match(srcRgx)[0] + '"'
          : null,
      srcset: srcsetRgx.test(x[0]) ? x[0].match(srcsetRgx)[0] : null,
      width: widthRgx.test(x[0]) ? x[0].match(widthRgx)[0] + '"' : null,
      elString: x[0],
      verifyString: fileToEdit.substring(x.index, x.index + x[0].length),
      indexStart: x.index,
      indexEnd: x.index + x[0].length,
    };

    return result;
  });

  return result;
}
