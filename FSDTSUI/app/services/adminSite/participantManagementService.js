'use strict';
fsdtsApp.factory('participantManagementService', ['httpHelper', 'organizationManagementService', '$q', 'appConstants', 'userProfileService',
    function (httpHelper, organizationManagementService, $q, appConstants, userProfileService) {

        //#region Scope variable declaration
        var serviceInstance = {};
        serviceInstance.organizationInfoList = [];
        var organizationDDLDataSource = [];
        var trackingItemDDLDataSource = [];
        //#endregion

        /** Adding new participant 
        * Method:   addToProject
        * Access:   Public 
        * @param    participantInfo object
        * @return   promise
        */
        serviceInstance.addToProject = function (participantInfo) {
            var postData = getPostData(participantInfo, appConstants.OPERATION_TYPE.ADD);
            return httpHelper.post(appConstants.API_END_POINTS.PARTICIPANT, postData);
        };

        /** Fetching all the available organization list
        * Method:   getOrganizatioList
        * Access:   Public 
        * @return   promise
        */
        serviceInstance.getOrganizatioList = function () {
            var defer = $q.defer();
            serviceInstance.organizationInfoList = [];
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

        /** Provide data to the Organization DDL
        * Method:   papulateOrganizationDDL
        * Access:   Public 
        * @return   promise
        */
        serviceInstance.papulateOrganizationDDL = function () {
            var defer = $q.defer();
                serviceInstance.getOrganizatioList().then(function (result) {
                    organizationDDLDataSource = serviceInstance.organizationInfoList.map(function (organizationObj) {
                        return { 'id': organizationObj.organizationId, 'name': organizationObj.name }
                    });
                    defer.resolve(organizationDDLDataSource);
                }, function (error) {
                    console.log(error);
                });
            return defer.promise;
        };

        /** Fetching tracking items such as course,program,certification etc 
        * Method:   papulateTrackingItemDDL
        * Access:   Public 
        * @param    selectedFormat i.e 'Courses'Programs' ,'Certifications'
        * @return   promise
        */
        serviceInstance.papulateTrackingItemDDL = function (selectedFormat, selectedOrganization) {
            var selectedOrganizationInfo = serviceInstance.organizationInfoList.filter(function (item) {
                return item.organizationId === selectedOrganization.id;
            });

            return getTrackingItemList(selectedOrganizationInfo[0], selectedFormat);

        };

        /** Fetching ParticipantList for showing in grid
        * Method:   getParticipantList
        * Access:   Public 
        * @return   promise
        */
        serviceInstance.getParticipantList = function () {
            var defer = $q.defer();
            httpHelper.get(appConstants.API_END_POINTS.PARTICIPANT + '?pid=' + userProfileService.profile.params.projectId).then(function (result) {
                var projectOrganizationList = _.groupBy(getParticipantMapList(result), "organizationId");
                defer.resolve(projectOrganizationList);
            }, function (error) {
                console.log(error);
            });

            return defer.promise;
        };

        /** USed to delete(soft) the selected participant
        * Method:   deleteParticipant
        * Access:   Public 
        * @return   promise
        */
        serviceInstance.deleteParticipant = function (selectedParticipant) {
            var postData = getPostData(selectedParticipant, appConstants.OPERATION_TYPE.DELETE);
            return httpHelper.patch(appConstants.API_END_POINTS.PARTICIPANT + selectedParticipant.projOrgId, postData);
        };

        /** Map server model to UI model 
        * Method:   getParticipantMapList
        * Access:   private 
        * @param  organizationParticipantList i.e the server model
        * @return   participantMapList 
        */
        var getParticipantMapList = function (organizationParticipantList) {
            var participantMapList = [];
            angular.forEach(organizationParticipantList, function (organizationParticipant) {
                var organizationParticipantModel = {
                    'projOrgId': organizationParticipant.ProjOrgId,
                    'organizationId': organizationParticipant.OrgId,
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

        /** Map server model to UI model 
        * Method:   getParticipantMapList
        * Access:   private 
        * @param  organizationParticipantList i.e the server model , selectedFormat i.e i.e 'Courses'Programs' ,'Certifications'
        * @return   participantMapList 
        */
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

        /** Create the post data required by service for add/edit/get participant 
       * Method:   getPostData
       * Access:   Private 
       * @param    participantInfo object
       * @return   postData object
       */
        var getPostData = function (participantInfo,actionType) {
            var postData = null;
            try {
                if (actionType === appConstants.OPERATION_TYPE.ADD) {
                    postData = {
                        'ProjectId': userProfileService.profile.params.projectId,
                        'OrganizationId': participantInfo.selectedOrganization.id,
                        'Format': participantInfo.format,
                        'ProgramId': participantInfo.selectedTrackingItem.type === 'Programs' ? participantInfo.selectedTrackingItem.id : 0,
                        'CourseId': participantInfo.selectedTrackingItem.type === 'Courses' ? participantInfo.selectedTrackingItem.id : 0,
                        'CredentialId': participantInfo.selectedTrackingItem.type === 'Certifications' ? participantInfo.selectedTrackingItem.id : 0,
                        'IsDeleted': false
                    };
                } else if (actionType === appConstants.OPERATION_TYPE.DELETE) {
                    postData = {
                        'IsDeleted': true
                    };
                }

            } catch (e) {
                console.log('Error on creating postData', e);
            }
            return postData;
        };

        return serviceInstance;
    }
]);