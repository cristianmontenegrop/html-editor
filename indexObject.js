import img from './gulpfile.js';
import input_object from './index.js';
import { replaceImageToPicture, readFileContent } from './moduleFn/index.js';

// if breakpoint_end is false, max-width is replaced by min-width
let createImageResponsiveObject = async function () {
  // console.log('createImageResponsiveObject');
  // console.log('input_object: ', input_object);
  let formats_by_image_type_array = [];

  //structuring Object to feed to img()
  input_object.image_formats.map((image_format) => {
    input_object.breakpoints.map((y) => {
      formats_by_image_type_array = [
        {
          width: y.image_width,
          format: image_format,
          rename: { suffix: y.suffix },
        },
        ...formats_by_image_type_array,
      ];
    });
  });
  return { formats: formats_by_image_type_array };
};

let htmlElementEditing = async () => {
  let structureFileNameData = async function (x) {
    // const inputFilePath = path.join(inputDirPath, inputFileName);
    // console.log('structurFilenameData: ', x);
    let fileInfo = {
      inputFilePath: x.html_file_source,
      outputRelativeFilePath: x.html_file_destination,
      outputFilePath: x.html_file_destination,
      inputFileContent: await readFileContent(x.html_file_source),
      oldElement: x.element_to_replace,
      imageTypeSelection: x.image_formats,
      breakPointSelection: x.breakpoints,
      ...x,

      // inputDirPath: inputDirPath,
      // inputDirRelativePath: './insert-file-here',
      // inputFileName: inputFileName,
      // outputFileName: inputFileName,
      // outputDirPath: path.join(__dirname, './edited-file'),
      // outputRelativeDirPath: './edited-file',
    };
    return fileInfo;
  };

  await structureFileNameData(input_object).then(async (fileInfo) => {
    let { replaceElementSuccess, writeOnFileResponse } =
      await replaceImageToPicture({
        // imageTypeSelection: imageTypeSelection,
        // breakpointSelection: breakpointSelection,
        ...fileInfo,
      });
  });
};

if (input_object.do_you_need_image_conversion) {
  createImageResponsiveObject().then((x) => {
    x = {
      image_source: input_object.image_source,
      image_destination: input_object.image_destination,
      ...x,
    };
    try {
      img(x);
    } catch (error) {
      console.error('Please check the image_source path', error);
    }
  });
}

if (input_object.do_you_need_image_element_to_picture) {
  htmlElementEditing();
}
