import fs from 'fs';
import util from 'util';

export async function writeOnFile(outputDirPath, editedFileContent) {
  console.log('function writeFile Executed!!');
  editedFileContent = editedFileContent.join('');

  const fsAccesPromise = util.promisify(fs.access);
  const fsCopyPromise = util.promisify(fs.copyFile);
  const fsUnlinkPromise = util.promisify(fs.unlink);
  const fsAppendPromise = util.promisify(fs.appendFile);

  console.log('outputDirPath.fullPath: ', outputDirPath.fullPath);
  console.log('outputDirPath.fullPath: ', outputDirPath.fullPath);
  console.log('outputDirPath.fullPath: ', outputDirPath.fullPath);

  const fileAccess = await fsAccesPromise(outputDirPath.fullPath).catch((err) =>
    console.log('Error!', err)
  );
  console.log('fileAccess : ', fileAccess);
  const copyFile = fsCopyPromise(outputDirPath.fullPath);

  const fileUnlink = await fsUnlinkPromise(outputDirPath.fullPath).catch(
    (err) => console.log('Error!', err)
  );
  console.log('fileUnlink: ', fileUnlink);

  const appendFile = await fsAppendPromise(
    outputDirPath.fullPath,
    `${editedFileContent}`
  ).catch((err) => console.log('Error!', err));
  console.log('appendFile: ', appendFile);

  return { editedFileContent };
}


//mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm


export async function writeOnFile(outputDirPath, editedFileContent) {
  console.log('function writeFile Executed!!');
  editedFileContent = editedFileContent.join('');
  fs.access('./edited-file/hello.html',  (err, x) => {
    console.log('x : ', x);
    if (err) {
      throw err;
    } else {
      fs.copyFile(
        './edited-file/hello.html',
        './edited-file/',
        fs.constants.COPYFILE_FICLONE,
        (err) => {
          if (err) throw err;
        }
      );
    }
  });
  fs.unlink('./edited-file/hello.html', (err, y) => {
    console.log(' y:', y);
    if (err) throw err;
  });
  fs.appendFile(
    './edited-file/hello.html',
    `${editedFileContent}`,
    (err, z) => {
      console.log('z :', z);
      if (err) throw err;
    }
  )