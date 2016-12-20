
// Gulp packages

try {

var gulp             = require('gulp'), // gulp core.
    gutil            = require('gulp-util'), // Display logs in console.
    sass             = require('gulp-sass'), // Compile SASS code.
    jshint           = require('gulp-jshint'), // JS Code quality.
    stylelint        = require('gulp-stylelint'), // CSS code quality.
    ignore           = require('gulp-ignore'), // Exclude files.
    postcss          = require('gulp-postcss'), // Post CSS features.
    autoprefixer     = require('autoprefixer'), // Add browsers prefix.
    sourcemaps       = require('gulp-sourcemaps'), // Generate SASS sourcemap.
    md5File          = require('md5-file'), // Generate MD5 hash.
    aigis            = require('gulp-aigis'), // Generate styleguide.
    spritesmith      = require('gulp.spritesmith'), // Generate sprites.
    bless            = require('gulp-bless'); // Detect number of CSS selector (to FIX IE9).

} catch(err) {

  gutil.log('>> Un ou plusieurs modules sont manquants, lancer la commande `npm install`');
  gutil.log('>> ' + err.message);

  return;

}

// Define the default task
gulp.task('default', ['sprites', 'build-css', 'watch']);


// Compile SASS
gulp.task('build-css', function() {

  gutil.log(' ');
  gutil.log(' ');

  return gulp.src('sources/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', onError)
    .pipe(postcss([ autoprefixer({ browsers: ['last 3 versions', '> 1%'] }) ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css'))
    .pipe(bless({
      log: true,
      imports: false,
      suffix: '-part-'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css/'));

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
    .pipe(ignore.exclude('**/_sprites.scss'))
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
  spriteData.css.pipe(gulp.dest('sources/scss/theme/___global'));
});




// Watch
gulp.task('watch', function() {

  gulp.watch('sources/scss/**/*.scss', ['build-css', 'styleguide']);
  gulp.watch('assets/js/**/*.js', ['jshint']);
  gulp.watch('sources/sprites/*.png', ['sprites']);
  gulp.watch('assets/css/*.css', ['lint-css']);

});
