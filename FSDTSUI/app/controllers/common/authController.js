/**
Is used to provide all event handling logic for authentication and authorization

*/
'use strict';
fsdtsApp.controller('authController', ['$scope', 'userProfileService', '$location', '$cookieStore',
    function ($scope, userProfileService, $location, $cookieStore) {

        //On login button click handler
        $scope.onLogin = function () {
            //Dummy code
            setDummyAdminProfile();
            $location.path('/');
        };

        var setDummyAdminProfile = function () {
            $scope.userProfile.loggedIn = true;
            $scope.userProfile.credentials.userType = 'ADMIN';
            $cookieStore.put('userProfile', $scope.userProfile);
        };
        //used for initializing the controller
        var init = (function () {

        })();

    }
]);