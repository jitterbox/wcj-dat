/**  Service descriptions
 *Implementing user authentication & authorization module
 *Expose method :
    getUserProfile
    login
    logout
 * @return promise

*/

//TODO: Putting actual implementation : Dummy code need to be removed & implementation need to be done as per authentication and authorization mechanism
'use strict';
fsdtsApp.factory('authService', ['httpHelper', '$q','appConstants',
    function (httpHelper, $q, appConstants) {
        var serviceInstance = {};

        serviceInstance.logIn = function (userCredential) {
            var postData = getPostData(userCredential);
           // return httpHelper.post(appConstants.API_END_POINTS.LOGIN_USER, postData);

            var defer = $q.defer();
            httpHelper.post(appConstants.API_END_POINTS.LOGIN_USER,postData).then(function (result) {
                //var projectOrganizationList = _.groupBy(getParticipantMapList(result), "organizationId");
                var userProfile = getUserProfile(result);
                defer.resolve(userProfile);
            }, function (error) {
                defer.reject(error);
                console.log(error);
            });

            return defer.promise;
        };

        serviceInstance.logOut = function () {
        };

        serviceInstance.forgotPassword = function (forgotPasswordInfo) {
            if (forgotPasswordInfo) {
                var postData = {
                    'UserEmail': forgotPasswordInfo.emailId,
                    'UserFirstName': forgotPasswordInfo.firstName,
                };
            }
            return httpHelper.post(appConstants.API_END_POINTS.FORGOTPASSWORD, postData);
        };

        serviceInstance.validateAuthCode = function (authCode) {
                var postData = {
                    'VerificationNo': authCode
                };
            return httpHelper.post(appConstants.API_END_POINTS.FORGOTPASSWORD, postData);
        };

        serviceInstance.resetPassword = function (resetPasswordInfo) {
            if (resetPasswordInfo) {
                var postData = {
                    'UserPassword': resetPasswordInfo.newPassword,
                    'VerificationNo': resetPasswordInfo.authCode,
                };
            }
            return httpHelper.patch(appConstants.API_END_POINTS.RESETPASSWORD + '?id=' + resetPasswordInfo.userId, postData);

        };

        var getPostData = function (userCredential) {
            var postData=null;
            if (userCredential) {
                postData = {
                    "UserEmail": userCredential.emailId,//"t@r.com",
                    "UserPassword": userCredential.password,//"azhar123"
                }
            }

            return postData;
        };

        var getUserProfile = function (userProfileServerModel) {
            
            var profile = {};
            if (userProfileServerModel) {
                profile = {
                    'status': userProfileServerModel.UserStatus,
                    'loggedIn': true,
                    'credentials': {
                        'authToken': '',
                        'userName': userProfileServerModel.UserFirstName,
                        'userType': userProfileServerModel.UserType
                    },
                    'permissions': {
                        'manageOrganizations': userProfileServerModel.ManageOrganizations,
                        'manageProjects': userProfileServerModel.ManageProjects,
                        'manageUsers': userProfileServerModel.ManageUsers,

                    },
                    'params': {

                    }
                };
            } else {
                profile = {
                    'loggedIn': false,
                };
            }

            return profile;
        };

        return serviceInstance;
    }
]);