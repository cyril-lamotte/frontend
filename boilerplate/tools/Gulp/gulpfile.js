

// Gulp packages
var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    sass         = require('gulp-sass'),
    jshint       = require('gulp-jshint')
    ignore       = require('gulp-ignore')
    postcss      = require('gulp-postcss')
    autoprefixer = require('autoprefixer')
    sassdoc      = require('sassdoc')
    sourcemaps   = require('gulp-sourcemaps');



// Define the default task
gulp.task('default', ['build-css', 'sassdoc','watch']);







// Compile SASS
gulp.task('build-css', function() {

  gutil.log('\n\n## Compiling CSS\n');


  return gulp.src('sources/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css'));

});





// JS hint
gulp.task('jshint', function() {
  return gulp.src('assets/js/**/*.js')
    .pipe(ignore.exclude('**/lib/*.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});



// Sassdoc
gulp.task('sassdoc', function() {

  var options = {
    dest: './sources/docs',
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



// Watch
gulp.task('watch', function() {

  gulp.watch('sources/scss/**/*.scss', ['build-css', 'sassdoc']);
  gulp.watch('assets/js/**/*.js', ['jshint']);

});
