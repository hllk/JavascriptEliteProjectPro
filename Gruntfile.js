module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['src/**/*.js'],
      options: {
        // options here to override JSHint defaults
        jshintrc: true
      }
    },
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      
      dist: {
        src: [
            //'lib/*.js', // All JS in the libs folder
            'src/**/*.js'  // This specific file
        ],
        dest: 'build/production.js',
      }
    }   
  });

  // Load the plugin that provides the "jshint" task.
  //grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['jshint','concat']);
};
