'use strict';
var fsdtsApp1 = angular.module('fsdtsApp1', ['ngRoute']);
fsdtsApp1.controller('homeController',
['$rootScope', '$scope',
function($rootScope, $scope) {
     var x = 10; x = 30;
   var y;
    $rootScope.activeMenu = {
   'home' : '',
        'blog' : '',
        'about' : 'active',
        'contact' : '',
        'admin' : ''
    };
    $rootScope.showTitle = true;

    $rootScope.pageTitle = 'About Me';
    $rootScope.pageDescription = 'Here is my story.';

    $scope.test = 'test';
    debugger;

    if (x === y) {
        console.log(y);

    }

    var text = "HelloWorld";

}

]);