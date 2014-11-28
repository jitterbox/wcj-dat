/**  Service descriptions
 *Used to provide all the functionality required for credential module
    
 *Expose method :
    addCredential(endPoint,postData)
    post data format :
    var postData = {
            "CredentialName": "Credential-1",
            "CredentialDescription": "sample string 3",
            "CredentialStatus": true,
            "OrganizationsId": 1
        };


*/

'use strict';
fsdtsApp.factory('credentialManagementService', ['httpHelper', '$q', 'appConstants', 'userProfileService',
    function (httpHelper, $q, appConstants, userProfileService) {
        var serviceInstance = {};

        /**
        *Add credential functionality
        */
        serviceInstance.addCredential = function (credentialInfo) {
            var postData = getPostData(credentialInfo);
            return httpHelper.post(appConstants.API_END_POINTS.CREDENTIAL, postData);
        };

        /**
         Edit credential functionality
        */
        serviceInstance.editCredential = function (credentialInfo) {
            var postData = getPostData(credentialInfo, appConstants.OPERATION_TYPE.EDIT);
            return httpHelper.put(appConstants.API_END_POINTS.CREDENTIAL + userProfileService.profile.params.credentialId, postData);
        };

        /**
         Return credential details by courseId
         */
        serviceInstance.getCredentialDetails = function (credentialId) {
            if (credentialId) {//If not pass programId then it returns all courses
                return httpHelper.get(appConstants.API_END_POINTS.CREDENTIAL + credentialId);
            } else {
                return httpHelper.get(appConstants.API_END_POINTS.CREDENTIAL + '?Oid=' + userProfileService.profile.params.organizationId);
            }
        };

        /**
         Populate credential UI model by mapping server model
         */
        serviceInstance.populateCredentialModel = function (serverResponseObj) {
            var credentialInfo = {};
            if (serverResponseObj) {
                credentialInfo = {
                    'credentialId': serverResponseObj.CredentialId,
                    'name': serverResponseObj.CredentialName,
                    'description': serverResponseObj.CredentialDescription,
                    'status': serverResponseObj.CredentialStatus,
                    'editedOn': serverResponseObj.CredentialLastEditedOn,
                    'editedBy': serverResponseObj.CredentialLastEditedBy
                };
            }
            return credentialInfo;
        };

        /** Create the post data required by service for add/edit/get credential 
        * Method:   getPostData
        * Access:   Private 
        * @param    credentialInfo object
        * @return   postData object
        */
        var getPostData = function (credentialInfo, actionType) {
            var postData = null;
            try {
                postData = {
                    'CredentialName': credentialInfo.name,
                    'CredentialDescription': credentialInfo.description,
                    'CredentialStatus': credentialInfo.status,
                    'OrganizationId': userProfileService.profile.params.organizationId,
                    'CredentialLastEditedOn': new Date().yyyymmdd(),
                    'CredentialLastEditedBy': userProfileService.profile.credentials.userName
                };
                if (actionType === appConstants.OPERATION_TYPE.EDIT) {
                    postData.CredentialId = userProfileService.profile.params.credentialId;
                }
            } catch (e) {
                console.log('Error on creating postData', e);
            }
            return postData;
        };

        return serviceInstance;
    }
]);