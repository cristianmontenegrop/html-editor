import fs from 'fs';
import util from 'util';
import inquirer from 'inquirer';

// export async function writeOnFile(outputDirPath, editedFileContent) {
export async function writeOnFile(fileInfo) {
  console.log('function writeFile Executed!!');
  // console.log('fileInfo in writeOnFile: ', fileInfo);
  fileInfo.editedFileContent = fileInfo.editedFileContent.join('');

  const promisify = util.promisify;
  const fsCopyPromise = promisify(fs.copyFile);
  const fsUnlinkPromise = promisify(fs.unlink);
  const fsAppendPromise = promisify(fs.appendFile);

  let writeOnFileObj = {
    access: function () {
      console.log('access!');
      let fileExists = fs.existsSync(fileInfo.outputFilePath);
      return fileExists;
    },
    copy: async function () {
      console.log('copy!');
      return await fsCopyPromise(
        fileInfo.outputRelativeFilePath,
        fileInfo.outputRelativeDirPath
      );
    },
    unLink: async function () {
      console.log('unlink!');
      return await fsUnlinkPromise(fileInfo.outputRelativeFilePath).catch(
        (err) => console.log('Error!', err)
      );
    },
    append: async function () {
      console.log('append!');
      return await fsAppendPromise(
        fileInfo.outputRelativeFilePath,
        fileInfo.editedFileContent
      ).catch((err) => console.log('Error!', err));
    },
  };

  let x = writeOnFileObj.access();

  // inquirer
  //   .prompt([
  //     {
  //       name: 'confirmCopy',
  //       type: 'confirm',
  //       message:
  //         'Warning!, existing file in output folder with same name, create copy?',
  //     },
  //   ])
  //   .then(({ confirmCopy }) => {
  //     if (confirmCopy) {
  //       writeOnFileObj.copy(copyFile)
  //       console.log('copyFile: ', copyFile);
  //     }

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
