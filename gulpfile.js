var
  gulp         = require('gulp'),
  sass           = require('gulp-sass'),
  cleanCSS       = require('gulp-clean-css'),
  rename         = require('gulp-rename'),
  autoprefixer   = require('gulp-autoprefixer'),
  notify         = require("gulp-notify");

function styles() {
  return gulp.src('src/style/sass/**/*.sass')
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'main',
      suffix: '.min',
      prefix: ''
    }))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(gulp.dest('src/style/css'))
}

function watch() {
  gulp.watch('src/style/sass/**/*.sass', gulp.series(styles));
}


var build = gulp.series(styles);

gulp.task('build', build);

gulp.task('default', gulp.series(build, watch));
