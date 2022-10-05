import fs from 'fs';
import util from 'util';

// Function that reads file content of a Directory, input is directory's absolute path, output is array of file names.
export async function readFiles(inputDirPath) {
  const readDirPromise = util.promisify(fs.readdir);

  const filesInDir = await readDirPromise(inputDirPath).catch((err) =>
    console.log('Error!', err)
  );
  return filesInDir;
}

// Function that reads content of a file, input is file's absolute path, out put is file's content
export async function readFileContent(inputFilePath) {
  const readFilePromise = util.promisify(fs.readFile);

  const fileContent = await readFilePromise(inputFilePath, 'utf8').catch(
    (err) => console.log('Error!', err)
  );

  return fileContent;
}
