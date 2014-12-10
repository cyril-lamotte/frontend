module.exports = function (grunt) {

  // Use notation : "<%= pkg.name %>"" to include package's informations

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-html');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('test', ['htmllint', 'jshint']);
  //grunt.registerTask('default', ['watch']);

  // Launch
  // grunt | grunt watch
  // grunt test

};
