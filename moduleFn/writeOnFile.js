import fs from 'fs';
import util from 'util';
import inquirer from 'inquirer';
import path from 'path';

// export async function writeOnFile(outputDirPath, editedFileContent) {
export async function writeOnFile(fileInfo) {
  console.log('function writeFile Executed!!');
  // console.log('fileInfo in writeOnFile: ', fileInfo);
  fileInfo.editedFileContent = fileInfo.editedFileContent.join('');

  const promisify = util.promisify;
  const fsCopyPromise = promisify(fs.copyFile);
  const fsUnlinkPromise = promisify(fs.unlink);
  const fsAppendPromise = promisify(fs.appendFile);

  let fsFnObj = {
    access: function () {
      console.log('access!');
      let fileExists = fs.existsSync(fileInfo.outputFilePath);
      return fileExists;
    },
    copy: async function () {
      console.log('copy!');

      const pathBegining =
        fileInfo.outputRelativeFilePath.split(/\.[0-9a-z]+$/i);
      const pathEnd = fileInfo.outputRelativeFilePath.split(/^.+\./i);
      const copyPath = pathBegining[0] + 'copy.' + pathEnd[pathEnd.length - 1];
      console.log('copyPath: ', copyPath);
      return await fsCopyPromise(
        fileInfo.outputRelativeFilePath,
        copyPath,
        fs.constants.COPYFILE_FICLONE
      );
    },
    unLink: async function (path) {
      console.log('unlink!');
      try {
        return await fsUnlinkPromise(path);
      } catch (err) {
        console.log('Error!', err);
      }
    },
    append: async function () {
      console.log('append!');
      const res = await fsAppendPromise(
        fileInfo.outputRelativeFilePath,
        fileInfo.editedFileContent
      ).catch((err) => console.log('Error!', err));
      return res;
    },
  };

  let x = fsFnObj.access();
  console.log('x: ', x);
  if (x) {
    await inquirer
      .prompt([
        {
          name: 'confirmCopy',
          type: 'confirm',
          message:
            'Warning!, existing file in output folder with same name, create copy?',
        },
      ])
      .then(async ({ confirmCopy }) => {
        let copyRes;
        if (confirmCopy) {
          copyRes = await fsFnObj.copy();
          console.log('copyRes: ', copyRes);
        }
        if (copyRes === undefined) {
          const fileUnlink = await fsFnObj.unLink(
            fileInfo.outputRelativeFilePath
          );
          console.log('fileUnlink: ', fileUnlink);
        }
        

      });
  } else {
    try {
      console.log('try statement exec!: ');

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

  // await fsAccesPromise(fileInfo.outputFilePath)
  //   .then((x) => {
  //     console.log('x: ', x);
  //     inquirer
  //       .prompt([
  //         {
  //           name: 'confirmCopy',
  //           type: 'confirm',
  //           message:
  //             'Warning!, existing file in output folder with same name, create copy?',
  //         },
  //       ])
  //       .then(({ confirmCopy }) => {
  //         if (confirmCopy) {
  //           const copyFile = fsCopyPromise(
  //             fileInfo.outputRelativeFilePath,
  //             fileInfo.outputRelativeDirPath
  //           );
  //           console.log('copyFile: ', copyFile);
  //         }
  //       });
  //   })
  //   .catch((err) => {
  //     if (err.code === 'ENOENT') {
  //     } else {
  //       console.log('Error!', err);
  //     }
  //   });

  // const fileUnlink = await fsUnlinkPromise(
  //   fileInfo.outputRelativeFilePath
  // ).catch((err) => console.log('Error!', err));
  // console.log('fileUnlink: ', fileUnlink);

  // const appendFile = await fsAppendPromise(
  //   fileInfo.outputRelativeFilePath,
  //   `${fileInfo.editedFileContent}`
  // ).catch((err) => console.log('Error!', err));
  // console.log('appendFile: ', appendFile);

  // await fsAccesPromise(fileInfo.outputFilePath)
  //   .then((x) => {
  //     console.log('x: ', x);
  //     inquirer
  //       .prompt([
  //         {
  //           name: 'confirmCopy',
  //           type: 'confirm',
  //           message:
  //             'Warning!, existing file in output folder with same name, create copy?',
  //         },
  //       ])
  //       .then(({ confirmCopy }) => {
  //         if (confirmCopy) {
  //           const copyFile = fsCopyPromise(
  //             fileInfo.outputRelativeFilePath,
  //             fileInfo.outputRelativeDirPath
  //           );
  //           console.log('copyFile: ', copyFile);
  //         }
  //       });
  //   })
  //   .catch((err) => {
  //     if (err.code === 'ENOENT') {
  //     } else {
  //       console.log('Error!', err);
  //     }
  //   });

  // const fileUnlink = await fsUnlinkPromise(
  //   fileInfo.outputRelativeFilePath
  // ).catch((err) => console.log('Error!', err));
  // console.log('fileUnlink: ', fileUnlink);

  // const appendFile = await fsAppendPromise(
  //   fileInfo.outputRelativeFilePath,
  //   `${fileInfo.editedFileContent}`
  // ).catch((err) => console.log('Error!', err));
  // console.log('appendFile: ', appendFile);

  return;
  // return { fileInfoeditedFileContent: fileInfo.editedFileContent };
}
