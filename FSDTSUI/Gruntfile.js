module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //watch: {
        //    css: {
        //        files: [
        //          '**/*.sass',
        //          '**/*.scss'
        //        ],
        //        tasks: ['compass']
        //    },
        //    js: {
        //        files: [
        //          'code/*.js',
        //          'Gruntfile.js'
        //        ],
        //        tasks: ['jshint', 'test', 'karma']
        //    }
        //},
        //compass: {
        //    dist: {
        //        options: {
        //            sassDir: 'assets/sass',
        //            cssDir: 'assets/css',
        //            outputStyle: 'compressed'
        //        }
        //    }
        //},
        jshint: {
            // define the files to lint
            files: ['app/config.js'],
            options: {
                jshintrc: '.jshintrc'
            },
            //all: ['Gruntfile.js', 'assets/js/*.js']
        },
        //concat: {
        //    js: {
        //        src: ['js/jquery-2.0.3.min.js',
        //              'js/plugins/*.js',
        //              'js/site.js'],
        //        dest: 'build.js',
        //        options: {
        //            separator: ';'
        //        }
        //    }
        //},
        test: {
            files: ['test/spec/**/*.js']
        },
        karma: {
            unit: {
                configFile: 'karma.config.js'
            }
        }
    });

    // Load the Grunt plugins.

    // Load required modules
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-test');

    // Task definitions
   // grunt.registerTask('default', ['concat', 'test']);
    grunt.registerTask('test', ['karma']);

};