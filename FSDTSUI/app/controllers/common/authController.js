/**
Is used to provide all event handling logic for authentication and authorization

*/
'use strict';
fsdtsApp.controller('authController', ['$scope', '$rootScope', 'userProfileService', '$location', '$cookieStore', 'appConstants', 'authService','$route',
    function ($scope, $rootScope, userProfileService, $location, $cookieStore, appConstants, authService, $route) {
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
        //Generate new captcha code
        $scope.refreshCaptcha = function () {
            if ($scope.forgotPassword) {
                $scope.forgotPassword.captcha = drawCaptcha();
            } else {
                $scope.forgotPassword = { 'captcha': drawCaptcha() };
            }
        };
        //On forgot password button click handler
        $scope.onSubmitForgotPassword = function () {
            event.preventDefault();
            if ($scope.validator.validate() && validateCaptcha()) {
                $scope.validationClass = "valid";
                //$scope.showSpin = true;
            } else {
                $scope.validationClass = "invalid";
            }
        };
        //On reset password button click handler
        $scope.onSubmitRestPassword= function () {
        };
        //Validate captcha code
        var validateCaptcha = function () {
            if (removeSpaces($scope.forgotPassword.captcha) === removeSpaces($scope.forgotPassword.rewriteCaptcha) ) {
                $scope.forgotPassword.showMessage = false;
                return true;
            } else {
                $scope.forgotPassword.showMessage = true;
                $scope.forgotPassword.message = 'Invalid captcha';
                return false;
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
            if ($route && $route.current && $route.current.$$route && $route.current.$$route.data && $route.current.$$route.data.actionType) {
                if ($route.current.$$route.data.actionType === appConstants.OPERATION_TYPE.LOGIN) {//Initialization for login
                    $scope.userAuth = { 'invalidCredential': false };
                } else if ($route.current.$$route.data.actionType === appConstants.OPERATION_TYPE.FORGOTPASSWORD) {//Initalization for forgot password
                    $scope.forgotPassword = { 'captcha': drawCaptcha() };
                } else if ($route.current.$$route.data.actionType === appConstants.OPERATION_TYPE.RESETPASSWORD) {//Initialization for reset password
                }
            }
            console.log($route);
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