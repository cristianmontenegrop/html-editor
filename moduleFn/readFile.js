import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import util from 'util';
const __filename = fileURLToPath(import.meta.url);
// console.log(__filename);
const __dirname = path.dirname(__filename);
// console.log(__dirname);
let dirPath = path.join(__dirname, '../insert-file-here');

export async function readFile() {
  const readDirPromise = util.promisify(fs.readdir);
  const readFilePromise = util.promisify(fs.readFile);

  const filesInDir = await readDirPromise(dirPath).catch((err) =>
    console.log('Error!', err)
  );
  let filePath = path.join(dirPath, filesInDir[0]);
  const fileContent = await readFilePromise(filePath, 'utf8').catch((err) =>
    console.log('Error!', err)
  );
  // console.log('filePath: ', filePath);
  // console.log('fileName: ', filesInDir);
  // console.log('file Content: ', fileContent);
  return fileContent;
}
