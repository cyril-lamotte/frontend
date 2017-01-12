'use strict';

/**
  * Usage :
  *
  * `gulp` : Lancer l'écoute des répertoire.
  * `gulp archive` : Générer une archive du répertoire.
  */


/* =============================================================================
   Configuration
============================================================================= */

try {

// Packages
var gulp             = require('gulp'), // gulp core.
    $                = require('gulp-load-plugins')(), // Automatic plugins loads
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


// Project
var project = {
  namespace: 'mockup'
}

// Paths
var paths = {
  js: 'assets/js/',
  css: 'assets/css/',
  scss: 'sources/scss/',
  img: 'assets/img/',
  sprites: 'sources/sprites/'
}

// Errors managment
var onError = function(err) {
  gutil.log(err.message);
  this.emit('end');
}


/* =============================================================================
   Build tasks
============================================================================= */

/**
  * Build CSS
  *
  * Compilation SASS
  * Génération des sourcemaps
  * Autoprefixer
  */
gulp.task('build-css', function() {

  console.log('');
  console.log('');

  return gulp.src(paths.scss + '**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', onError)
    .pipe(postcss([ autoprefixer({ browsers: ['last 3 versions', '> 1%'] }) ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css))
    .pipe(bless({
      log: true,
      imports: false,
      suffix: '-part-'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css));

});


// Build sprites.
gulp.task('sprites', function () {

  var fs = require('fs');
  var hash = '';

  if (fs.existsSync(paths.img + 'sprites.png')) {
    hash = md5File.sync(paths.img + 'sprites.png');
  }

  var spriteData = gulp.src(paths.sprites + '*.png')
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

  spriteData.img.pipe(gulp.dest(paths.img));
  spriteData.css.pipe(gulp.dest(paths.scss + 'theme/___global'));
});


// Build styleguide.
gulp.task('styleguide', function() {
  return gulp.src('./sources/styleguide/aigis_config.yml')
    .pipe(aigis());
});


/* =============================================================================
   Lint
============================================================================= */

// SCSS
gulp.task('lint-css', function lintCssTask() {

  return gulp
    .src(paths.scss + '**/*.scss')
    .pipe(ignore.exclude('**/_sprites.scss'))
    .pipe(stylelint({
      syntax: 'scss',
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});


// JS
gulp.task('jshint', function() {
  return gulp.src(paths.js + '**/*.js')
    .pipe(ignore.exclude('**/lib/*.js'))
    .pipe(ignore.exclude('**/plugins/contrib/*.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


/* =============================================================================
   Others
============================================================================= */

// Build Zip
gulp.task('archive', function () {

  var now = new Date(),
      date = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2) + '__' + now.getHours() + 'h' + now.getMinutes(),
      zipName = date + '__' + project.namespace + '.zip';

  gutil.log(zipName);

  return gulp.src(['./**/', '!./node_modules/**', '!./node_modules'])
    .pipe($.zip(zipName))
    .pipe(gulp.dest('./'));
});


/* =============================================================================
   Defaut & watch
============================================================================= */

// Watch.
gulp.task('watch', function() {

  gulp.watch(paths.scss + '**/*.scss', ['build-css', 'styleguide']);
  gulp.watch(paths.js + '**/*.js', ['jshint']);
  gulp.watch(paths.sprites + '*.png', ['sprites']);
  gulp.watch(paths.css + '*.css', ['lint-css']);

});


// Define the default task.
gulp.task('default', ['sprites', 'build-css', 'watch']);

