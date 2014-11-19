/**  Service descriptions
*Used to provide all the functionality required for period module
    
*Expose method :
addPeriod(periodInfo)
post data format :
var postData = {
"PeriodId": 2,
"PeriodTitle": "Period one",
"PeriodStartDate": "2014-11-05T03:22:19.913",
"PeriodEndDate": "2014-11-05T03:22:19.913",
"PeriodDeadlineDate": "2014-11-05T03:22:19.913",
"PeriodYear": "sample string 6",
"IsDeleted": false,
"ProjectId": 7
};

editPeriod(periodInfo)
getPeriodDetails(periodId)
*/

'use strict';
fsdtsApp.factory('periodManagementService', ['httpHelper', 'appConstants', 'userProfileService',
    function (httpHelper, appConstants, userProfileService) {
        var serviceInstance = {};

        /** Adding new period 
        * Method:   addPeriod
        * Access:   Public 
        * @param    periodInfo object
        * @return   promise
        */
        serviceInstance.addPeriod = function (periodInfo) {
            var postData = getPostData(periodInfo);
            return httpHelper.post(appConstants.API_END_POINTS.ADD_PERIOD, postData);
        };

        /** Deleting new period 
        * Method:   deletePeriod
        * Access:   Public 
        * @param    periodInfo object
        * @return   promise
        */
        serviceInstance.deletePeriod = function (periodInfo) {
            var postData = getPostData(periodInfo, appConstants.OPERATION_TYPE.DELETE);
            return httpHelper.put(appConstants.API_END_POINTS.DELETE_PERIOD + periodInfo.periodId, postData);
        };

        /** Return period details by courseId
        * Method:   getPeriodDetails
        * Access:   Public 
        * @param    periodId
        * @return   promise
        */
        serviceInstance.getPeriodDetails = function () {
            return httpHelper.get(appConstants.API_END_POINTS.GET_PERIOD + '?Prjid=' + userProfileService.profile.params.projectId);
            //            if (periodId) {//If not pass programId then it returns all period
            //                return httpHelper.get(appConstants.API_END_POINTS.GET_PERIOD + periodId);
            //            } else {
            //                
            //            }
        };

        /** Return client period data model by mapping to the server data model
        * Method:   populatePeriodModel
        * Access:   Public 
        * @param    Period details server  response
        * @return   periodInfo object
        */
        serviceInstance.populatePeriodModel = function (serverResponseObj) {
            var periodInfo = {};
            if (serverResponseObj) {
                periodInfo = {
                    'periodId': serverResponseObj.PeriodId, //If periodId is null or undefine then initialized with empty string
                    'title': serverResponseObj.PeriodTitle,
                    'startDate': new Date(serverResponseObj.PeriodStartDate).yyyymmdd(),
                    'endDate': new Date(serverResponseObj.PeriodEndDate).yyyymmdd(),
                    'deadlineDate': new Date(serverResponseObj.PeriodDeadlineDate).yyyymmdd(),
                    'year': serverResponseObj.PeriodYear
                };
            }
            return periodInfo;

        };

        /** Create the post data required by service for add/edit/get period 
        * Method:   getPostData
        * Access:   Private 
        * @param    periodInfo object
        * @return   postData object
        */
        var getPostData = function (periodInfo, actionType) {
            var postData = null;
            try {
                postData = {
                    'PeriodTitle': periodInfo.title,
                    'PeriodStartDate': new Date(periodInfo.startDate).yyyymmdd(), //"2014-11-05T12:31:29.5629962+05:30"
                    'PeriodEndDate': new Date(periodInfo.endDate).yyyymmdd(),
                    'PeriodDeadlineDate': new Date(periodInfo.deadlineDate).yyyymmdd(),
                    'PeriodYear': periodInfo.year,
                    'ProjectId': userProfileService.profile.params.projectId,
                    'IsDeleted': false
                };
                if (actionType === appConstants.OPERATION_TYPE.DELETE) {
                    postData.PeriodId = periodInfo.periodId;
                    postData.IsDeleted = true;
                }
            } catch (e) {
                console.log('Error on creating postData', e);
            }
            return postData;
        };

        return serviceInstance;
    }
]);