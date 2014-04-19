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
                node: true
            },

            lib: {
                src: ['<%= directories.lib %>', '!<%= directories.test %>'],
            },
            test: {
                src: '<%= directories.test %>',
                options: {
                    globals: {
                        describe: true,
                        it: true
                    }
                }
            }
        },

        mochaTest: {
            lib: {
                src: '<%= directories.test %>'
            }
        }
    });

    grunt.registerTask('test', [
        'jshint',
        'mochaTest'
    ]);

    grunt.registerTask('default', 'test');

};
