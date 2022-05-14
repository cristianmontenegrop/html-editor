import { indexFile, fileToEdit } from './index.js';

export function replaceElement(oldElement, newElement) {
  console.dir(oldElement);
  oldElement = oldElement.replace(' ', '');
  console.dir(oldElement);
  oldElement = oldElement.split('*');
  console.dir(oldElement);
  let { oldElementBegining, oldElementEnd } = '';

  // indexFile(oldElementBegining, oldElementEnd);

  // fileToEdit.replaceall();

  return;
}
