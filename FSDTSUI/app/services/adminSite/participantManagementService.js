'use strict';
fsdtsApp.factory('participantManagementService', ['httpHelper', 'organizationManagementService', '$q', 'appConstants', 'userProfileService',
    function (httpHelper, organizationManagementService, $q, appConstants, userProfileService) {
        var serviceInstance = {};
        serviceInstance.organizationInfoList = [];
        var organizationDDLDataSource = [];
        var trackingItemDDLDataSource = [];

        serviceInstance.addToProject = function (participantInfo) {
            var postData = getPostData(participantInfo);
            return httpHelper.post(appConstants.API_END_POINTS.PARTICIPANT, postData);
        };

        serviceInstance.getOrganizatioList = function () {
            var defer = $q.defer();
            organizationManagementService.getOrganizationDetails().then(function (result) {
                angular.forEach(result, function (organization) {
                    serviceInstance.organizationInfoList.push(organizationManagementService.populateOrganizationModel(organization));
                });
                defer.resolve(true);
            }, function (error) {
                defer.reject('Error: ' + error);
                console.log(error);
            });
            return defer.promise;
        };

        serviceInstance.papulateOrganizationDDL = function () {
            var defer = $q.defer();
            if (serviceInstance.organizationInfoList.length > 0) {
                organizationDDLDataSource = serviceInstance.organizationInfoList.map(function (organizationObj) {
                    return { 'id': organizationObj.organizationId, 'name': organizationObj.name }
                });
                defer.resolve(organizationDDLDataSource);
            } else {
                serviceInstance.getOrganizatioList().then(function (result) {
                    organizationDDLDataSource = serviceInstance.organizationInfoList.map(function (organizationObj) {
                        return { 'id': organizationObj.organizationId, 'name': organizationObj.name }
                    });
                    defer.resolve(organizationDDLDataSource);
                }, function (error) {
                    console.log(error);
                });
            }

            return defer.promise;
        };

        serviceInstance.papulateTrackingItemDDL = function (selectedFormat, selectedOrganization) {
            var selectedOrganizationInfo = serviceInstance.organizationInfoList.filter(function (item) {
                return item.organizationId === selectedOrganization.id;
            });

            return getTrackingItemList(selectedOrganizationInfo[0], selectedFormat);

        };


        serviceInstance.getCourseList = function (organizationId) {
        };

        serviceInstance.getProgramList = function (organizationId) {
        };

        serviceInstance.getCertificatioList = function (organizationId) {

        };

        serviceInstance.getParticipantList = function () {
            var defer = $q.defer();

//            var data =
//[
//{
//    "ProjectName": "MCTA WIF Spreadsheet",
//    "OrganizationName": "Columbiana County Career & Tech Center - Lisbon",
//    "Format": "Courses",
//    "ProgramName": "",
//    "Course": "MSSC Quality",
//    "Credential": ""
//},
//{
//    "ProjectName": "MCTA WIF Spreadsheet",
//    "OrganizationName": "Columbiana County Career & Tech Center - Lisbon",
//    "Format": "Programs",
//    "ProgramName": "Associate degree in Electrical Engineering (EERT)",
//    "Course": "",
//    "Credential": ""
//},
//{
//    "ProjectName": "MCTA WIF Spreadsheet",
//    "OrganizationName": "Columbiana County Career & Tech Center - Lisbon",
//    "Format": "Programs",
//    "ProgramName": "Associate degree in Electrical Engineering (EERT)",
//    "Course": "",
//    "Credential": ""
//},
//{
//    "ProjectName": "MCTA WIF Spreadsheet",
//    "OrganizationName": "Four Rivers Workforce Investment BOARD",
//    "Format": "Courses",
//    "ProgramName": "",
//    "Course": "test course",
//    "Credential": ""
//}
//];
            // var test = getParticipantMapList(data);userProfileService.profile.params.projectId 
            httpHelper.get(appConstants.API_END_POINTS.PARTICIPANT + '?pid=' + userProfileService.profile.params.projectId).then(function (result) {
                var projectOrganizationList = _.groupBy(getParticipantMapList(result), "organizationName");
                defer.resolve(projectOrganizationList);
            }, function (error) {
                console.log(error);
            });

            return defer.promise;
        };

        var getParticipantMapList = function (organizationParticipantList) {
            var participantMapList = [];
            angular.forEach(organizationParticipantList, function (organizationParticipant) {
                var organizationParticipantModel = {
                    'projOrgId': organizationParticipant.ProjOrgId,
                    'projectName':organizationParticipant.ProjectName,
                    'organizationName':organizationParticipant.OrganizationName,
                    'format':organizationParticipant.Format
                    
                };

                if (organizationParticipant.Format === 'Courses') {
                    organizationParticipantModel.name = organizationParticipant.Course;
                } else if (organizationParticipant.Format === 'Programs') {
                    organizationParticipantModel.name = organizationParticipant.ProgramName;
                } else if (organizationParticipant.Format === 'Certifications') {
                    organizationParticipantModel.name = organizationParticipant.Credential;
                }

                participantMapList.push(organizationParticipantModel);
            });

            return participantMapList;
        };

        var getTrackingItemList = function (organizationInfo, selectedFormat) {
            var trackingItemList = [];
            if (selectedFormat === 'Certifications') {
                trackingItemList = organizationInfo.credentials.map(function (trackingObj) {
                    return { 'id': trackingObj.CredentialId, 'name': trackingObj.CredentialName, 'type': 'Certifications' }
                });
                console.log(trackingItemList);
            } else if (selectedFormat === 'Courses') {
                trackingItemList = organizationInfo.courses.map(function (trackingObj) {
                    return { 'id': trackingObj.CourseId, 'name': trackingObj.CourseName, 'type': 'Courses' }
                });
            } else if (selectedFormat === 'Programs') {
                trackingItemList = organizationInfo.programs.map(function (trackingObj) {
                    return { 'id': trackingObj.ProgramId, 'name': trackingObj.ProgramName, 'type': 'Programs' }
                });
            }
            return trackingItemList;
        };

        /** Create the post data required by service for add/edit/get course 
       * Method:   getPostData
       * Access:   Private 
       * @param    courseInfo object
       * @return   postData object
       */
        var getPostData = function (participantInfo) {
            var postData = null;
            try {
                postData = {
                    'ProjectId': userProfileService.profile.params.projectId,
                    'OrganizationId': participantInfo.selectedOrganization.id,
                    'Format': participantInfo.format,
                    'ProgramId': participantInfo.selectedTrackingItem.type === 'Programs' ? participantInfo.selectedTrackingItem.id : 0,
                    'CourseId': participantInfo.selectedTrackingItem.type === 'Courses' ? participantInfo.selectedTrackingItem.id : 0,
                    'CredentialId': participantInfo.selectedTrackingItem.type === 'Certifications' ? participantInfo.selectedTrackingItem.id : 0,
                    'IsDeleted': false
                };

            } catch (e) {
                console.log('Error on creating postData', e);
            }
            return postData;
        };
        return serviceInstance;
    }
]);