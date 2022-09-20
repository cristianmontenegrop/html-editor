import fs from 'fs';

export function writeOnFile(editedFile) {
  console.log('function writeFile Executed!!');
  editedFile = editedFile.join('');
  fs.access('./edited-file/hello.html', (err, x) => {
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
  fs.unlink('./edited-file/hello.html', (err) => {
    if (err) throw err;
  });
  fs.appendFile('./edited-file/hello.html', `${editedFile}`, (err) => {
    if (err) throw err;
  });

  return 'file created succesfully';
}
