import fs from 'fs';
import util from 'util';
import inquirer from 'inquirer';

export async function writeOnFile(fileInfo) {
  fileInfo.editedFileContent = fileInfo.editedFileContent.join('');

  const promisify = util.promisify;
  const fsCopyPromise = promisify(fs.copyFile);
  const fsUnlinkPromise = promisify(fs.unlink);
  const fsAppendPromise = promisify(fs.appendFile);

  let fsFnObj = {
    access: function () {
      try {
        let fileExists = fs.existsSync(fileInfo.outputFilePath);
        return fileExists;
      } catch (err) {
        console.error(err);
      }
    },
    copy: async function () {
      try {
        const pathBegining =
          fileInfo.outputRelativeFilePath.split(/\.[0-9a-z]+$/i);
        const pathEnd = fileInfo.outputRelativeFilePath.split(/^.+\./i);
        const copyPath =
          pathBegining[0] + 'copy.' + pathEnd[pathEnd.length - 1];
        return await fsCopyPromise(
          fileInfo.outputRelativeFilePath,
          copyPath,
          fs.constants.COPYFILE_FICLONE
        );
      } catch (err) {
        console.error('Error!', err);
      }
    },
    unLink: async function (path) {
      try {
        return await fsUnlinkPromise(path);
      } catch (err) {
        console.error('Error!', err);
      }
    },
    append: async function () {
      try {
        return await fsAppendPromise(
          fileInfo.outputRelativeFilePath,
          fileInfo.editedFileContent
        );
      } catch (err) {
        console.error('Error!', err);
      }
    },
  };

  let x = fsFnObj.access();
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
      const fileUnlink = await fsFnObj.unLink(fileInfo.outputRelativeFilePath);
      const appendFile = await fsFnObj.append();
      if (appendFile === undefined) {
        return fsFnObj.access(fileInfo.outputRelativeFilePath);
      } else {
        return false;
      }
    } else {
      //  disregard existing file, replace it
      try {
        const fileUnlink = await fsFnObj.unLink(
          fileInfo.outputRelativeFilePath
        );
        const appendFile = await fsFnObj.append();
        if (appendFile === undefined) {
          return fsFnObj.access(fileInfo.outputRelativeFilePath);
        } else {
          return false;
        }
      } catch (err) {
        console.error('Error!', err);
      }
    }
  } else {
    try {
      const appendFile = await fsFnObj.append();
      if (appendFile === undefined) {
        return fsFnObj.access(fileInfo.outputRelativeFilePath);
      } else {
        return false;
      }
    } catch (err) {
      console.error('Error!', err);
    }
  }
}
