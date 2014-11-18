/** Controller descriptions
Is used to provide all event handling logic for course management view i.e courseManagement.html;
*/
'use strict';

fsdtsApp.controller('participantManagementController', ['$scope', 'appConstants', 'courseManagementService', '$location', 'userProfileService', 'participantManagementService',
function ($scope, appConstants, courseManagementService, $location, userProfileService, participantManagementService) {

    ////TODO: Optimization : Dummy implementation need to be removed
    //$scope.courseList = [];
    ////#region Grid initialization
    //$scope.columnDefs = [{ field: 'name', displayName: 'Name', cellTemplate: '<div class="ngCellText"><a href="" ng-click="onActionClick(row.entity,\'course\')">{{row.getProperty(\'name\')}}</a></div>' },
    //                     { field: 'status', displayName: 'Status', width: 80, cellClass: 'gridColumn-align' }];
    //$scope.selectedItems = [];
    //$scope.papulateGrid = false;
    ////#endregion

    ////On select action from grid
    //$scope.onActionClick = function (actionObject) {
    //    userProfileService.profile.params.courseId = actionObject.selectedRow.courseId;;
    //    if (actionObject.actionName === 'course') {
    //        $location.path('/course/2');
    //    }
    //};

    //var populateCourseList = function (courseList) {
    //    angular.forEach(courseList, function (course) {
    //        $scope.courseList.push(courseManagementService.populateCourseModel(course));
    //    });

    //    if ($scope.courseList.length >= 0) {
    //        $scope.papulateGrid = !$scope.papulateGrid;
    //    }
    //};

    ////Get all programs
    //var getAllCourses = function () {
    //    //Show spin window
    //    $scope.showSpin = true;
    //    courseManagementService.getCourseDetails().then(function (result) {
    //        populateCourseList(result);
    //        //Hide spin window
    //        $scope.showSpin = false;
    //    }, function (error) {
    //        console.log(error);
    //    });
    //};

   
    $scope.organizationDDLList = [];
    $scope.trackingItemDDLList = [];
    $scope.participantInfo = {};

    //Submit button click handler
    $scope.onSubmit = function (event) {
            $scope.confirmWindowOption.actionType = "Submit";
            $scope.confirmWindowOption.showConfirm = true;
        
    };

    //call back handler for confirmation window
    $scope.confirmActionHandler = function (actionType, isConfirmed) {
        if ((actionType === 'Submit') && (isConfirmed === true)) {
                addToProject();
        }

    };

    $scope.onOrganizationSelect = function () {
        console.log($scope.participantInfo.selectedOrganization);
        resetDependentDDL();
    };

    $scope.onFormatSelect = function (selectedFormat) {
        console.log(selectedFormat);
        loadTrackingItemDDL(selectedFormat);
    };

    var resetDependentDDL = function () {
        $scope.participantInfo.format = null;
        $scope.trackingItemDDLList = [];
        $scope.participantInfo.selectedTrackingItem = null;
    };

    var addToProject = function () {
        console.log('organization', $scope.participantInfo.selectedOrganization);
        console.log($scope.participantInfo.selectedTrackingItem);
        alert('addToProject');
    };

    var loadTrackingItemDDL = function (selectedFormat) {
        $scope.trackingItemDDLList = participantManagementService.papulateTrackingItemDDL(selectedFormat, $scope.participantInfo.selectedOrganization);
       
    };

    var loadOrganizationDDL = function () {
        participantManagementService.papulateOrganizationDDL().then(function (result) {
            $scope.organizationDDLList = result;
            $scope.participantInfo.selectedOrganization = $scope.organizationDDLList[0];
            }, function (error) {
                console.log(error);
            });
    };

    //Used for initializing the controller
    var init = function () {
        //#region initialize scope variables
        $scope.confirmWindowOption = {
            actionType: null,
            showConfirm: false
        };
        //#endregion
        loadOrganizationDDL();
    }();

}
]);