

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
    sassdoc      = require('sassdoc'),
    sourcemaps   = require('gulp-sourcemaps'),
    livereload   = require('gulp-livereload'),
    spritesmith  = require('gulp.spritesmith');

} catch(err) {

  gutil.log('\n\n-> Un ou plusieurs modules sont manquants, lancer la commande `npm install`\n');
  return;

}

// Define the default task
gulp.task('default', ['watch']);







// Compile SASS
gulp.task('build-css', function() {

  gutil.log('\n\n## Compiling CSS\n');


  return gulp.src('sources/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', onError)
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css'))
    .pipe(livereload());

});



function onError(err) {

  gutil.log(err.message);
  this.emit('end');
}



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







// Sassdoc
gulp.task('sassdoc', function() {

  var options = {
    dest: './sources/sassdoc',
    verbose: false,
    groups: {
      'undefined': 'Ungrouped',
      theme: 'Thème',
      rwd: 'Responsive Design',
      layout: 'Mise en page',
      utils: 'Utilitaire',
      sprites: 'Sprites',
    }
  };

  return gulp.src('sources/scss/**/*.scss')
    .pipe(sassdoc(options));
});





gulp.task('sprites', function () {

  var spriteData = gulp.src('sources/sprites/*.png')
      .pipe(spritesmith({
        /* this whole image path is used in css background declarations */
        imgName: '../img/sprites.png',
        //retinaImgName: '../img/sprite@2x.png',
        //retinaSrcFilter: ['sources/sprites/*@2x.png'],
        cssName: '_sprites.scss',
        padding: 5
    }));

  spriteData.img.pipe(gulp.dest('assets/img'));
  spriteData.css.pipe(gulp.dest('sources/scss'));
});





// Watch
gulp.task('watch', function() {

  livereload.listen();

  gulp.watch('sources/scss/**/*.scss', ['build-css', 'sassdoc']);
  gulp.watch('assets/js/**/*.js', ['jshint']);
  gulp.watch('sources/sprites/*.png', ['sprites']);
  gulp.watch('assets/css/*.css', ['lint-css']);

});
