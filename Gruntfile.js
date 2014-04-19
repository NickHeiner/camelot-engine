'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        jshint: {
            lib: {
                files: 'lib/**/*.js',
                options: {
                    node: true
                }
            }
        },

        mochaTest: {
            lib: {
                files: 'lib/**/*.test.js'
            }
        }
    });

    grunt.registerTask('test', [
        'jshint',
        'mochaTest'
    ]);

    grunt.registerTask('default', 'test');

};
