/// <reference path="scripts/lib/angular-route.min.js" />
/// <reference path="scripts/lib/angular-mocks.js" />
/// <reference path="scripts/lib/angular.min.js" />


// Karma configuration
// Generated on Thu Oct 16 2014 12:42:37 GMT+0530 (India Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
       'atlantPlugins/html/js/plugins/jquery/jquery.min.js',
       'scripts/lib/angular.min.js',
       'scripts/lib/angular-mocks.js',
       'scripts/lib/angular-route.min.js',
       'scripts/lib/underscore-min.js',
       'app/*.js',
       'app/controllers/common/homeController.js',
       //'app/services/adminSite/*.js',
       //'app/services/authentication/*.js',
       //'app/services/utils/*.js',
       'test/spec/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    plugins: [
    'karma-chrome-launcher',
    'karma-jasmine',
    'karma-ng-html2js-preprocessor'
    ],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
