/**
Is used to provide all event handling logic for authentication and authorization

*/
'use strict';
fsdtsApp.controller('authController', ['$scope', '$rootScope', 'userProfileService', '$location', '$cookieStore', 'appConstants', 'authService', '$route', '$routeParams',
    function ($scope, $rootScope, userProfileService, $location, $cookieStore, appConstants, authService, $route, $routeParams) {
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
            if ($scope.forgotPasswordInfo) {
                $scope.forgotPasswordInfo.captcha = drawCaptcha();
            } else {
                $scope.forgotPasswordInfo = { 'captcha': drawCaptcha() };
            }
        };

        //On forgot password button click handler
        $scope.onSubmitForgotPassword = function () {
            event.preventDefault();
            if ($scope.validator.validate() && validateCaptcha()) {
                $scope.validationClass = "valid";
                forgotPassword();
            } else {
                $scope.validationClass = "invalid";
            }
        };

        //On reset password button click handler
        $scope.onSubmitRestPassword = function () {
            event.preventDefault();
            if ($scope.validator.validate() ) {
                $scope.validationClass = "valid";
                resetPassword();
            } else {
                $scope.validationClass = "invalid";
            }

            
        };

        var resetPassword = function () {
            $scope.showSpin = true;
            authService.resetPassword($scope.resetPasswordInfo).then(function (result) {
                //Hide spin window
                $scope.showSpin = false;
                $scope.resetPasswordInfo.showMessage = true;
                $scope.resetPasswordInfo.message = appConstants.ERROR_MESSAGES.RESETPASSWORD.SUCCESS;
                //$location.path('/login');

                //if (result === 'Success') {
                //    $scope.forgotPasswordInfo.showMessage = true;
                //    $scope.forgotPasswordInfo.message = appConstants.ERROR_MESSAGES.FORGOTPASSWORD.SUCCESS;
                //    $location.path('/login');
                //}
                //else if (result === 'Failure') {
                //    $scope.forgotPasswordInfo.showMessage = true;
                //    $scope.forgotPasswordInfo.message = appConstants.ERROR_MESSAGES.FORGOTPASSWORD.FAILURE;
                //}

            }, function (error) {
                $scope.showSpin = false;
                $scope.resetPasswordInfo.showMessage = true;
                $scope.resetPasswordInfo.message = appConstants.ERROR_MESSAGES.RESETPASSWORD.FAILURE;
                console.log(error);
            });
        };

        var forgotPassword = function () {
            $scope.showSpin = true;
            authService.forgotPassword($scope.forgotPasswordInfo).then(function (result) {

                //Hide spin window
                $scope.showSpin = false;

                if (result === 'Success') {
                    $scope.forgotPasswordInfo.showMessage = true;
                    $scope.forgotPasswordInfo.message = appConstants.ERROR_MESSAGES.FORGOTPASSWORD.SUCCESS;
                } else if (result === 'Failure') {
                    $scope.forgotPasswordInfo.showMessage = true;
                    $scope.forgotPasswordInfo.message = appConstants.ERROR_MESSAGES.FORGOTPASSWORD.FAILURE;
                }

            }, function (error) {
                $scope.showSpin = false;
                $scope.forgotPasswordInfo.showMessage = false;
                $scope.forgotPasswordInfo.message = error;
                console.log(error);
            });
        };

        //Validate captcha code
        var validateCaptcha = function () {
            if (removeSpaces($scope.forgotPasswordInfo.captcha) === removeSpaces($scope.forgotPasswordInfo.rewriteCaptcha)) {
                $scope.forgotPasswordInfo.showMessage = false;
                return true;
            } else {
                $scope.forgotPasswordInfo.showMessage = true;
                $scope.forgotPasswordInfo.message = appConstants.ERROR_MESSAGES.FORGOTPASSWORD.FAILURE.INVALIDCAPTCHA;
                return false;
            }
        };

        //Validate reset password auth code
        var validateAuthCode = function (authCode) {
            $scope.showSpin = true;
            authService.validateAuthCode(authCode).then(function (result) {
                //Hide spin window
                $scope.showSpin = false;
                if (result === 'Success') {
                    $scope.resetPasswordInfo.authCode = authCode;
                }
                else if (result === 'Failure') {
                    $scope.resetPasswordInfo.showMessage = true;
                    $scope.resetPasswordInfo.message = appConstants.ERROR_MESSAGES.FORGOTPASSWORD.INVALIDURL;
                }

            }, function (error) {
                $scope.showSpin = false;
                $scope.resetPasswordInfo.showMessage = true;
                $scope.resetPasswordInfo.message = error;
                console.log(error);
            });
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
                    $scope.forgotPasswordInfo = { 'captcha': drawCaptcha() };
                } else if ($route.current.$$route.data.actionType === appConstants.OPERATION_TYPE.RESETPASSWORD) {//Initialization for reset password
                    $scope.resetPasswordInfo = {};
                    var authCode = $routeParams.authCode;
                    $scope.resetPasswordInfo.authCode = authCode;
                    $scope.resetPasswordInfo.userId = $routeParams.userId
                    validateAuthCode(authCode);
                }
            }
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