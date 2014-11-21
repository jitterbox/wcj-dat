/**  Service descriptions
*Used to provide all the functionality required for user module
    
*Expose method :
addprogram(userInfo)
post data format :
var postData = {
    "UserId": 1,
    "UserFirstName": "sample string 2",
    "UserLastName": "sample string 3",
    "UserEmail": "sample string 4",
    "UserAddressLine1": "sample string 5",
    "UserAddressLine2": "sample string 6",
    "UserCity": "sample string 7",
    "UserState": "sample string 8",
    "UserZip": "sample string 9",
    "UserNotes": "sample string 10",
    "UserLastEditedOn": "2014-11-17T15:00:02.1554235+05:30",
    "UserLastEditedBy": "sample string 12",
    "OrganizationId": 13  
}
    editCourse(userInfo)
    getCourseDetails(userId)
*/

'use strict';
fsdtsApp.factory('userManagementService', ['httpHelper', '$q', 'appConstants', 'userProfileService',
function (httpHelper, $q, appConstants, userProfileService) {
    var serviceInstance = {};

    /** Adding new user
    * Method:   addUser
    * Access:   Public 
    * @param    userInfo object
    * @return   promise
    */
    serviceInstance.addUser = function (userInfo) {
        var postData = getPostData(userInfo);
        return httpHelper.post(appConstants.API_END_POINTS.USER, postData);
    };

    /** Edit existing user 
    * Method:   editUser
    * Access:   Public 
    * @param    userInfo object
    * @return   promise
    */
    serviceInstance.editUser = function (userInfo) {
        var postData = getPostData(userInfo, appConstants.OPERATION_TYPE.EDIT);
        return httpHelper.put(appConstants.API_END_POINTS.USER + userProfileService.profile.params.userId, postData);
    };

    /** Return user details by userId
    * Method:   getUserDetails
    * Access:   Public 
    * @param    userId
    * @return   promise
    */
    serviceInstance.getUserDetails = function (userId) {
        if (userId) {//If not pass programId then it returns all user
            return httpHelper.get(appConstants.API_END_POINTS.USER + userId);
        } else {
            return httpHelper.get(appConstants.API_END_POINTS.USER + '?Oid=' + userProfileService.profile.params.organizationId);
        }
    };

    /** Return client user data model by mapping to the server data model
    * Method:   populateUserModel
    * Access:   Public 
    * @param    User details server  response
    * @return   userInfo object
    */
    serviceInstance.populateUserModel = function (serverResponseObj) {
        var userInfo = {};
        if (serverResponseObj) {
            userInfo = {
                'userId': serverResponseObj.UserId, //If userId is null or undefine then initialized with empty string
                'firstname': serverResponseObj.UserFirstName,
                'lastname': serverResponseObj.UserLastName,
                'emailAddress': serverResponseObj.UserEmail,
                'addressLine1': serverResponseObj.UserAddressLine1,
                'addressLine2': serverResponseObj.UserAddressLine2,
                'city': serverResponseObj.UserCity,
                'state': serverResponseObj.UserState,
                'zip': serverResponseObj.UserZip,
                'phoneNumber': serverResponseObj.UserPhoneNumber,
                'status': serverResponseObj.UserStatus,
                'password': serverResponseObj.UserPassword,
                'editedOn': serverResponseObj.UserLastEditedOn,
                'editedBy': serverResponseObj.UserLastEditedBy

            };
        }
        return userInfo;

    };


    /** Create the post data required by service for add/edit/get user
    * Method:   getPostData
    * Access:   Private 
    * @param    userInfo object
    * @return   postData object
    */
    var getPostData = function (userInfo, actionType) {
        var postData = null;
        try {
            postData = {
                'UserFirstName': userInfo.firstname,
                'UserLastName': userInfo.lastname,
                'UserEmail': userInfo.emailAddress,
                'UserAddressLine1': userInfo.addressLine1,
                'UserAddressLine2': userInfo.addressLine2,
                'UserCity': userInfo.city,
                'UserState': userInfo.state,
                'UserZip': userInfo.zip,
                'UserPhoneNumber': userInfo.phoneNumber,
                'UserStatus': userInfo.status,
                'UserLastEditedOn': new Date().yyyymmdd(), //"2014-11-05T12:31:29.5629962+05:30"
                'UserLastEditedBy': userProfileService.profile.credentials.userName,
                'OrganizationId': userProfileService.profile.params.organizationId,
                'UserNotes': " ",
                'UserPassword': userInfo.password
            };
            if (actionType === appConstants.OPERATION_TYPE.EDIT) {
                postData.UserId = userProfileService.profile.params.userId;
            }
        } catch (e) {
            console.log('Error on creating postData', e);
        }
        return postData;
    };

    return serviceInstance;
}
]);