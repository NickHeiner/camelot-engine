'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        directories: {
            lib: 'lib/**/*.js',
            test: 'lib/**/*.test.js'
        },

        jshint: {
            options: {
                node: true,
                esversion: 6
            },

            lib: {
                src: ['<%= directories.lib %>', '!<%= directories.test %>'],
            },
            test: {
                src: '<%= directories.test %>',
                options: {
                    expr: true,
                    globals: {
                        describe: true,
                        it: true
                    }
                }
            }
        },
    });

    grunt.registerTask('test', [
        'jshint',
    ]);

    grunt.registerTask('default', 'test');

};
