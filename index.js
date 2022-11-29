// if breakpoint_end is false, max-width is replaced by min-width
let your_needs = {
  breakpoints: [
    {
      breakpoint_start: 0,
      breakpoint_end: 480,
      image_width: 480,
      suffix: '-xs',
    },
    {
      breakpoint_start: 481,
      breakpoint_end: 768,
      image_width: 640,
      suffix: '-sm',
    },
    {
      breakpoint_start: 769,
      breakpoint_end: 1279,
      image_width: 768,
      suffix: '-md',
    },
    {
      breakpoint_start: 1280,
      breakpoint_end: false,
      image_width: 1024,
      suffix: '-lg',
    },
  ],
  image_formats: ['webp', 'avif', 'jpeg', 'tiff'],
  // Place an * where attributes go, only self enclosed elements currently accepted
  element_to_replace: '<img*/>',
  do_you_need_image_conversion: true,
  do_you_need_image_element_to_picture: true,
// Remember to place "\\" for each "\" in path
  html_file_source: 'C:\\coding\\file-editor\\insert-file-here\\file.html',
  html_file_destination: 'C:\\coding\\file-editor\\edited-file\\file.html',
  image_source: 'C:\\coding\\Lumontih\\client\\src\\imgTest\\*.jpg',
  image_destination: 'C:\\coding\\Lumontih\\client\\src\\imgTest\\output',
};

export default your_needs;

