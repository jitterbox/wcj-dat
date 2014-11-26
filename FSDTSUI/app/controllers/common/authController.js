/**
Is used to provide all event handling logic for authentication and authorization

*/
'use strict';
fsdtsApp.controller('authController', ['$scope', '$rootScope', 'userProfileService', '$location', '$cookieStore', 'appConstants', 'authService',
    function ($scope, $rootScope, userProfileService, $location, $cookieStore, appConstants, authService) {
        var userProfileChangeEvent;
        //On login button click handler
        $scope.onLogin = function () {
            event.preventDefault();
            if ($scope.validator.validate()) {  // code for validation
                $scope.validationClass = "valid";

                //Show spin window
                $scope.showSpin = true;
                authService.logIn($scope.userCredential).then(function (userProfile) {
                    //Hide spin window
                    $scope.showSpin = false;
                    setUserProfile(userProfile);
                   // $scope.userCredential.invalidCredential = false;
                    $location.path('/');
                }, function (error) {
                    console.log();
                    $scope.showSpin = false;
                    $scope.userCredential.invalidCredential = true;
                });


            } else {
                $scope.validationClass = "invalid";
            }
        };

        //Set login user profile
        var setUserProfile = function (userProfileObj) {
            userProfileService.setUserProfile(userProfileObj);
            $scope.userProfile.loggedIn = userProfileService.profile.loggedIn;  // Used by appHeader directive
            $scope.userProfile.credentials.userType = userProfileService.profile.credentials.userType; // Used by appHeader directive
            userProfileChangeEvent = $rootScope.$broadcast(appConstants.EVENT_TYPE.USERPROFILE_CHANGE, userProfileObj);
        };

        //used for initializing the controller
        var init = (function () {
            $scope.userAuth = {'invalidCredential':false};
            $scope.errorWindowOption = {
                showError: false,
                errorMessage: null
            };
        })();

        //Remov all application level variables & handlers here
        $scope.$on("$destroy", function () {
            //Remove the evant handler
            // userProfileChange();
        });

    }
]);