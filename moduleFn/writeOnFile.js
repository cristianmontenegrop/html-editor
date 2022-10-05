import fs from 'fs';
import util from 'util';
import path from 'path';
import inquirer from 'inquirer';

// export async function writeOnFile(outputDirPath, editedFileContent) {
export async function writeOnFile(fileInfo) {
  console.log('function writeFile Executed!!');
  // console.log('fileInfo in writeOnFile: ', fileInfo);
  fileInfo.editedFileContent = fileInfo.editedFileContent.join('');

  const fsAccessPromise = util.promisify(fs.access);
  const fsCopyPromise = util.promisify(fs.copyFile);
  const fsUnlinkPromise = util.promisify(fs.unlink);
  const fsAppendPromise = util.promisify(fs.appendFile);
  let accessResponse;
  let writeOnFileObj = {
    access: async function () {
      console.log('access!');
      await fsAccessPromise(fileInfo.outputRelativeFilePath, fs.constants.R_OK)
        .then((x) => {
          console.log('Acces.then: ', x);
        })
        .catch((err) => {
          console.log('Error!', err);
          if (err.code === 'ENOENT') {
            return 'Hello!!!';
            // return err;
          } else {
            console.log('Error!', err);
            return 'Crap!!';
          }
        });
      console.log('accessResponse: ', accessResponse);
      return accessResponse;
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

  await writeOnFileObj.access().then((x) => {
    console.log('x: ', x);
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
  });

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
