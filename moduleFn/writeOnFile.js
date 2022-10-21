import fs from 'fs';
import util from 'util';
import inquirer from 'inquirer';

export async function writeOnFile(fileInfo) {
  console.log('function writeFile Executed!!');
  fileInfo.editedFileContent = fileInfo.editedFileContent.join('');

  const promisify = util.promisify;
  const fsCopyPromise = promisify(fs.copyFile);
  const fsUnlinkPromise = promisify(fs.unlink);
  const fsAppendPromise = promisify(fs.appendFile);

  let fsFnObj = {
    access: function () {
      console.log('access!');
      try {
        let fileExists = fs.existsSync(fileInfo.outputFilePath);
        return fileExists;
      } catch (err) {
        console.err(err);
      }
    },
    copy: async function () {
      console.log('copy!');
      try {
        const pathBegining =
          fileInfo.outputRelativeFilePath.split(/\.[0-9a-z]+$/i);
        const pathEnd = fileInfo.outputRelativeFilePath.split(/^.+\./i);
        const copyPath =
          pathBegining[0] + 'copy.' + pathEnd[pathEnd.length - 1];
        console.log('copyPath: ', copyPath);
        return await fsCopyPromise(
          fileInfo.outputRelativeFilePath,
          copyPath,
          fs.constants.COPYFILE_FICLONE
        );
      } catch (err) {
        console.err('Error!', err);
      }
    },
    unLink: async function (path) {
      console.log('unlink!');
      try {
        return await fsUnlinkPromise(path);
      } catch (err) {
        console.err('Error!', err);
      }
    },
    append: async function () {
      console.log('append!');
      try {
        return await fsAppendPromise(
          fileInfo.outputRelativeFilePath,
          fileInfo.editedFileContent
        );
      } catch {
        (err) => console.err('Error!', err);
      }
    },
  };

  let x = fsFnObj.access();
  console.log('x: ', x);
  if (x) {
    let { confirmCopy } = await inquirer.prompt([
      {
        name: 'confirmCopy',
        type: 'confirm',
        message:
          'Warning!, existing file in output folder with same name, create copy?',
      },
    ]);

    let copyRes;
    if (confirmCopy) {
      copyRes = await fsFnObj.copy();
      console.log('copyRes: ', copyRes);
      const fileUnlink = await fsFnObj.unLink(fileInfo.outputRelativeFilePath);
      console.log('fileUnlink: ', fileUnlink);
      const appendFile = await fsFnObj.append();
      if (appendFile === undefined) {
        return fsFnObj.access(fileInfo.outputRelativeFilePath);
      } else {
        return false;
      }
    } else {
      //  disregard existing file, replace it
      console.log('do not create copy, replace!!');
      try {
        const fileUnlink = await fsFnObj.unLink(
          fileInfo.outputRelativeFilePath
        );
        console.log('fileUnlink: ', fileUnlink);
        const appendFile = await fsFnObj.append();
        if (appendFile === undefined) {
          return fsFnObj.access(fileInfo.outputRelativeFilePath);
        } else {
          return false;
        }
      } catch {
        (err) => console.log('Error!', err);
      }
    }
    // if (copyRes === undefined) {
    //   const fileUnlink = await fsFnObj.unLink(fileInfo.outputRelativeFilePath);
    //   console.log('fileUnlink: ', fileUnlink);
    // }
  } else {
    try {
      const appendFile = await fsFnObj.append();
      if (appendFile === undefined) {
        return fsFnObj.access(fileInfo.outputRelativeFilePath);
      } else {
        return false;
      }
    } catch {
      (err) => console.log('Error!', err);
    }
  }
}
