/**
Is used to provide all event handling logic for authentication and authorization

*/
'use strict';
fsdtsApp.controller('authController', ['$scope','$rootScope' , 'userProfileService', '$location', '$cookieStore','appConstants',
    function ($scope,$rootScope,userProfileService, $location, $cookieStore, appConstants) {
        var userProfileChangeEvent;
        //On login button click handler
        $scope.onLogin = function () {
            //Dummy code
            setDummyAdminProfile();
            $location.path('/');
        };

        var setDummyAdminProfile = function () {
            var userProfileObj={
                    'status': '',
                    'loggedIn': true,
                    'credentials': {
                        'authToken': '',
                        'userName': 'Test Admin',
                        'userType': 'ADMIN'
                    },
                    'permissions': {

                    },
                    'params': {

                    }
            };
           
            userProfileService.setUserProfile(userProfileObj); 

            $scope.userProfile.loggedIn = userProfileService.profile.loggedIn ;  // Used by appHeader directive
            $scope.userProfile.credentials.userType = userProfileService.profile.credentials.userType; // Used by appHeader directive
            userProfileChangeEvent= $rootScope.$broadcast(appConstants.EVENT_TYPE.USERPROFILE_CHANGE, userProfileObj);
        };
        //used for initializing the controller
        var init = (function () {

        })();

        //Remov all application level variables & handlers here
        $scope.$on("$destroy", function () {
            //Remove the evant handler
           // userProfileChange();
        });

    }
]);