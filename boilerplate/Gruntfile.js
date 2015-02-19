module.exports = function (grunt) {

  // Use notation : "<%= pkg.name %>"" to include package's informations

  var autoprefixer = require('autoprefixer-core');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    postcss: {
        options: {
          remove: false, // Do not remove prefixes
          map: true, // Alter css maps too
          processors: [
            autoprefixer({ browsers: ['> 1% in FR, Android >= 2.3, Firefox >= 5, ie 8']}).postcss
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
        files: '<%= postcss.dis.src %>',
        tasks: 'postcss',
        options: {
           spawn: false
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

};
