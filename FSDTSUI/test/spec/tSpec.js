describe('Controller: homeController', function () {
    var ctrl;
    var $rootScope, $scope, $controller;
    //beforeEach(module('myApp.services'));
   // angular.mock.module('fsdtsApp1','ngRoute');
    beforeEach(module('fsdtsApp1', 'ngRoute'));

    beforeEach(inject(function (_$rootScope_, _$controller_) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;

        ctrl=$controller('homeController', { '$rootScope': $rootScope, '$scope': $scope });
    }));

    it('test case 1', function () {
       // debugger;
        expect($scope.test).toBe('test');
       // console.log($scope);
    });

    
});