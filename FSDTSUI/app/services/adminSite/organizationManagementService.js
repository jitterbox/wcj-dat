/**  Service descriptions
 *Used to provide all the functionality required for organization module
    
 *Expose method :
    addorganization(programInfo)
    post data format :
    var postData = {
        "OrganizationsName": "Organization-1",
        "OrganizationsAddress": "mumbai",
        "OrganizationsCityStateZip": 202,
        "OrganizationsType": "Training Provider",
        "OrganizationsStatus": "Active"
  }
   editCourse(organizationInfo)
    getCourseDetails(organizationId)
*/

'use strict';
fsdtsApp.factory('organizationManagementService', ['httpHelper', '$q', 'appConstants', 'userProfileService',
    function (httpHelper, $q, appConstants, userProfileService) {
        var serviceInstance = {};

        /** Adding new organization
        * Method:   addOrganization
        * Access:   Public 
        * @param    organizationInfo object
        * @return   promise
        */
        serviceInstance.addOrganization = function (organizationInfo) {
            var postData = getPostData(organizationInfo);
            return httpHelper.post(appConstants.API_END_POINTS.ORGANIZATION, postData);
        };

        /** Edit existing organization 
        * Method:   editOrganization
        * Access:   Public 
        * @param    organizationInfo object
        * @return   promise
        */
        serviceInstance.editOrganization = function (organizationInfo) {
            var postData = getPostData(organizationInfo, appConstants.OPERATION_TYPE.EDIT);
            return httpHelper.put(appConstants.API_END_POINTS.ORGANIZATION + userProfileService.profile.params.organizationId, postData);
        };

        /** Return course details by organizationId
        * Method:   getOrganizationDetails
        * Access:   Public 
        * @param    organizationId
        * @return   promise
        */
        serviceInstance.getOrganizationDetails = function (organizationId) {
            if (organizationId) {
                return httpHelper.get(appConstants.API_END_POINTS.ORGANIZATION + organizationId);
            } else {
                return httpHelper.get(appConstants.API_END_POINTS.ORGANIZATION);
            }
        };

        /** Return client organization data model by mapping to the server data model
        * Method:   populateOrganizationModel
        * Access:   Public 
        * @param    Organization details server  response
        * @return   organizationInfo object
        */
        serviceInstance.populateOrganizationModel = function (serverResponseObj) {
            var organizationInfo = {};
            if (serverResponseObj) {
                organizationInfo = {
                    
                    'organizationId': serverResponseObj.OrganizationId, 
                    'name': serverResponseObj.OrganizationName,
                    'addressLine1': serverResponseObj.OrganizationAddressLine1,
                    'addressLine2': serverResponseObj.OrganizationAddressLine2,
                    'city': serverResponseObj.OrganizationCity,
                    'state':serverResponseObj.OrganizationState,
                    'zip':serverResponseObj.OrganizationZip,
                    'type': serverResponseObj.OrganizationType,
                    'status': serverResponseObj.OrganizationStatus,
                    'notes': serverResponseObj.OrganizationNotes,
                    'editedOn': serverResponseObj.OrganizationLastEditedOn,
                    'editedBy': serverResponseObj.OrganizationLastEditedBy,
                    'courses': serverResponseObj.Course,
                    'credentials': serverResponseObj.Credential,
                    'programs': serverResponseObj.Program
      
                };
            }
            return organizationInfo;
        };

        /**
        * Create the post data required by service 
        */
        var getPostData = function (organizationInfo, actionType) {
            var postData = null;
            try {
                postData = {
                    'OrganizationName': organizationInfo.name,
                    'OrganizationType': organizationInfo.type,
                    'OrganizationAddressLine1': organizationInfo.addressLine1,
                    'OrganizationAddressLine2': organizationInfo.addressLine2,
                    'OrganizationCity': organizationInfo.city,
                    'OrganizationState': organizationInfo.state,
                    'OrganizationZip': organizationInfo.zip,
                    'OrganizationStatus': organizationInfo.status,
                    "OrganizationLastEditedOn": new Date().yyyymmdd(),//"2014-11-05T12:31:29.5629962+05:30",
                    "OrganizationLastEditedBy": userProfileService.profile.credentials.userName
                };
                if (actionType === appConstants.OPERATION_TYPE.EDIT) {
                    postData.OrganizationId = userProfileService.profile.params.organizationId;
                }
            } catch (e) {
                console.log('Error on creating postData', e);
            }
            return postData;

        };

        return serviceInstance;
    }
]);