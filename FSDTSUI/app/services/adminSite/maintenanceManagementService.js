/**  Service descriptions
/**  Service descriptions
*Used to provide all the functionality required for maintenance module
    
*Expose method :
addMaintenance(maintenanceInfo)
post data format :
var postData = {
    "CommonProgramsGroupingId": 1,
    "CommonProgramsGroupingName": "sample string 2",
    "CommonProgramsGroupingLastEditedOn": "2014-11-21T13:21:19.7120765+05:30",
    "CommonProgramsGroupingLastEditedBy": "sample string 4",
    "IsDeleted": true
};

editMaintenance(maintenanceInfo)
getMaintenanceDetails(commonProgramsGroupingId)
*/

'use strict';
fsdtsApp.factory('maintenanceManagementService', ['httpHelper', 'appConstants', 'userProfileService',
    function (httpHelper, appConstants, userProfileService) {
        var serviceInstance = {};

        /** Adding new maintenance 
        * Method:   addMaintenance
        * Access:   Public 
        * @param    maintenanceInfo object
        * @return   promise
        */
        serviceInstance.addMaintenance = function (maintenanceInfo) {
            var postData = getPostData(maintenanceInfo, appConstants.OPERATION_TYPE.ADD);
            return httpHelper.post(appConstants.API_END_POINTS.MAINTENANCE, postData);
        };

        /** Edit existing Maintenance 
        * Method:   editMaintenance
        * Access:   Public 
        * @param    courseInfo object
        * @return   promise
        */
        serviceInstance.editMaintenance = function (maintenanceInfo) {
            var postData = getPostData(maintenanceInfo, appConstants.OPERATION_TYPE.EDIT);
            return httpHelper.put(appConstants.API_END_POINTS.MAINTENANCE + userProfileService.profile.params.commonProgramsGroupingId, postData);
        };


        /** USed to delete(soft) the selected Maintenance
        * Method:   deleteMaintenance
        * Access:   Public 
        * @return   promise
        */
        serviceInstance.deleteMaintenance = function (maintenanceInfo) {
            var postData = getPostData(maintenanceInfo, appConstants.OPERATION_TYPE.DELETE);
            return httpHelper.patch(appConstants.API_END_POINTS.MAINTENANCE + maintenanceInfo.commonProgramsGroupingId, postData);
        };

        /** Return Maintenance details by commonProgramsGroupingId
        * Method:   getMaintenanceDetails
        * Access:   Public 
        * @param    maintenanceId
        * @return   promise
        */
        serviceInstance.getMaintenanceDetails = function (commonProgramsGroupingId) {
            if (commonProgramsGroupingId) {
                return httpHelper.get(appConstants.API_END_POINTS.MAINTENANCE + commonProgramsGroupingId);
            } else {
                return httpHelper.get(appConstants.API_END_POINTS.MAINTENANCE);
            }
            //return httpHelper.get(appConstants.API_END_POINTS.MAINTENANCE + userProfileService.profile.params.commonProgramsGroupingId);
        };

        /** Return client  maintenance data model by mapping to the server data model
        * Method:   populateMaintenanceModel
        * Access:   Public 
        * @param    Maintenance details server  response
        * @return   maintenanceInfo object
        */
        serviceInstance.populateMaintenanceModel = function (serverResponseObj) {
            var maintenanceInfo = {};
            if (serverResponseObj) {
                maintenanceInfo = {
                    'commonProgramsGroupingId': serverResponseObj.CommonProgramsGroupingId, //If commonProgramsGroupingId is null or undefine then initialized with empty string
                    'commonProgramGroupings': serverResponseObj.CommonProgramsGroupingName
                };
            }
            return maintenanceInfo;
        };

        /** Create the post data required by service for add/edit/get maintenance 
        * Method:   getPostData
        * Access:   Private 
        * @param    maintenanceInfo object
        * @return   postData object
        */
        var getPostData = function (maintenanceInfo, actionType) {
            var postData = null;
            try {
                if (actionType === appConstants.OPERATION_TYPE.ADD) {
                    postData = {
                        'CommonProgramsGroupingName': maintenanceInfo.commonProgramGroupings,
                        'CommonProgramsGroupingLastEditedOn': '2014-11-21T13:21:19.7120765+05:30',
                        'CommonProgramsGroupingLastEditedBy': 'sample string 4',
                        'IsDeleted': false
                    };
                } else if (actionType === appConstants.OPERATION_TYPE.DELETE) {
                    postData = {
                        'IsDeleted': true
                    };
                } else if (actionType === appConstants.OPERATION_TYPE.EDIT) {
                    postData = {
                        'CommonProgramsGroupingName': maintenanceInfo.commonProgramGroupings,
                        'CommonProgramsGroupingLastEditedOn': '2014-11-21T13:21:19.7120765+05:30',
                        'CommonProgramsGroupingLastEditedBy': 'sample string 4',
                        'IsDeleted': false,
                        'CommonProgramsGroupingId': userProfileService.profile.params.commonProgramsGroupingId
                    }
                }
            } catch (e) {
                console.log('Error on creating postData', e);
            }
            return postData;
        };
        return serviceInstance;
    }
]);