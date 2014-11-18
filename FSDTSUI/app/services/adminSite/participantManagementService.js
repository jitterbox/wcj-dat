'use strict';
fsdtsApp.factory('participantManagementService', ['httpHelper', 'organizationManagementService', '$q',
    function (httpHelper, organizationManagementService, $q) {
        var serviceInstance = {};
        serviceInstance.organizationInfoList = [];
        var organizationDDLDataSource = [];
        var trackingItemDDLDataSource = [];
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
        var getTrackingItemList = function (organizationInfo, selectedFormat) {
            var trackingItemList=[];
            if (selectedFormat === 'Certifications') {
                trackingItemList = organizationInfo.credentials.map(function (trackingObj) {
                    return { 'id': trackingObj.CredentialId, 'name': trackingObj.CredentialName,'type': 'Certifications'}
                });
                console.log(trackingItemList);
            } else if (selectedFormat === 'Courses') {
                trackingItemList = organizationInfo.courses.map(function (trackingObj) {
                    return { 'id': trackingObj.CourseId, 'name': trackingObj.CourseName ,'type':'Courses'}
                });
            } else if (selectedFormat === 'Programs') {
                trackingItemList = organizationInfo.programs.map(function (trackingObj) {
                    return { 'id': trackingObj.ProgramId, 'name': trackingObj.ProgramName,'type':'Programs' }
                });
            }
            return trackingItemList;
        };

        return serviceInstance;
    }
]);