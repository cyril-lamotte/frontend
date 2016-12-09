

// Gulp packages

try {

var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    sass         = require('gulp-sass'),
    jshint       = require('gulp-jshint'),
    ignore       = require('gulp-ignore'),
    postcss      = require('gulp-postcss'),
    stylelint    = require('gulp-stylelint'),
    autoprefixer = require('autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps'),
    md5File      = require('md5-file'),
    aigis        = require('gulp-aigis'),
    spritesmith  = require('gulp.spritesmith');

} catch(err) {

  gutil.log('\n\n-> Un ou plusieurs modules sont manquants, lancer la commande `npm install`\n');
  return;

}

// Define the default task
gulp.task('default', ['sprites', 'build-css', 'watch']);


// Compile SASS
gulp.task('build-css', function() {

  return gulp.src('sources/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', onError)
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css'));

});


// Avoid crash on error
function onError(err) {
  gutil.log(err.message);
  this.emit('end');
}


gulp.task('styleguide', function() {
  return gulp.src('./sources/styleguide/aigis_config.yml')
    .pipe(aigis());
});



gulp.task('lint-css', function lintCssTask() {

  return gulp
    .src('sources/scss/**/*.scss')
    .pipe(stylelint({
      syntax: 'scss',
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});




// JS hint
gulp.task('jshint', function() {
  return gulp.src('assets/js/**/*.js')
    .pipe(ignore.exclude('**/lib/*.js'))
    .pipe(ignore.exclude('**/plugins/contrib/*.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});



gulp.task('sprites', function () {

  var fs = require('fs');
  var hash = '';

  if (fs.existsSync('assets/img/sprites.png')) {
    hash = md5File.sync('assets/img/sprites.png');
  }

  var spriteData = gulp.src('sources/sprites/*.png')
      .pipe(spritesmith({
        /* this whole image path is used in css background declarations */
        imgName: '../img/sprites.png',
        imgPath: '../img/sprites.png?' + hash,
        //retinaImgName: '../img/sprite@2x.png',
        //retinaSrcFilter: ['sources/sprites/*@2x.png'],
        cssName: '_sprites.scss',
        padding: 5,
        cssOpts: {functions: false}
    }));

  spriteData.img.pipe(gulp.dest('assets/img'));
  spriteData.css.pipe(gulp.dest('sources/scss'));
});





// Watch
gulp.task('watch', function() {

  gulp.watch('sources/scss/**/*.scss', ['build-css', 'styleguide']);
  gulp.watch('assets/js/**/*.js', ['jshint']);
  gulp.watch('sources/sprites/*.png', ['sprites']);
  gulp.watch('assets/css/*.css', ['lint-css']);

});
