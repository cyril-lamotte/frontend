module.exports = function (grunt) {

  // Use notation : "<%= pkg.name %>"" to include package's informations

  var autoprefixer = require('autoprefixer-core');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    postcss: {
        options: {
          map: true,
          processors: [
            autoprefixer({ browsers: ['> 1% in FR, Android >= 2.3, last 2 Chrome versions, Firefox >= 5, ie 8'].postcss})
          ]
        },
        dist: { src: 'assets/css/*.css' }
    },

    htmllint: {
      // Exclude emails
      all: ["*.html", "!email.html"]
    },

    jshint: {
      all: ['assets/js/**/*.js', '!assets/js/lib/**/*.js', '!assets/js/plugins/**/*.js', 'gruntfile.js']
    },

    watch: {
      html: {
        files: ['<%= htmllint.all %>'],
        tasks: ['htmllint'],
        options: { spawn: false }
      },
      scripts: {
        files: ['<%= jshint.all %>'],
        tasks: ['jshint'],
        options: { spawn: false }
      },
      postcss: {
        files: 'assets/css/*',
        tasks: 'postcss',
        options: {
           nospawn: true
        }
       },
      options: {
        livereload: true
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-html');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');


  // Default task(s).
  //grunt.registerTask('test', ['htmllint', 'jshint']);
  grunt.registerTask('default', ['watch']);

  // Launch
  // grunt | grunt watch
  // grunt test

};
