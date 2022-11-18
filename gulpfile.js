import sharpResponsive from 'gulp-sharp-responsive';
import gulp from 'gulp';
let { src, dest } = gulp;

//Image Task
const img = (x) =>
  src(x.image_source).pipe(sharpResponsive(x)).pipe(dest(x.image_destination));

export default img;
