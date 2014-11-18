/** Controller descriptions
Is used to provide all event handling logic for course management view i.e courseManagement.html;
*/
'use strict';

fsdtsApp.controller('courseManagementController', ['$scope', 'appConstants', 'courseManagementService', '$location','userProfileService',
function ($scope, appConstants, courseManagementService, $location, userProfileService) {

    //TODO: Optimization : Dummy implementation need to be removed
    $scope.courseList = [];
    //#region Grid initialization
    $scope.columnDefs = [{ field: 'name', displayName: 'Name', cellTemplate: '<div class="ngCellText"><a href="" ng-click="onActionClick(row.entity,\'course\')">{{row.getProperty(\'name\')}}</a></div>' },
                         { field: 'status', displayName: 'Status', width: 80, cellClass: 'gridColumn-align' }];
    $scope.selectedItems = [];
    $scope.papulateGrid = false;
    //#endregion

    //On select action from grid
    $scope.onActionClick = function (actionObject) {
        userProfileService.profile.params.courseId = actionObject.selectedRow.courseId;;
        if (actionObject.actionName === 'course') {
            $location.path('/course/2');
        }
    };

    var populateCourseList = function (courseList) {
        angular.forEach(courseList, function (course) {
            $scope.courseList.push(courseManagementService.populateCourseModel(course));
        });

        if ($scope.courseList.length >= 0) {
            $scope.papulateGrid = !$scope.papulateGrid;
        }
    };

    //Get all programs
    var getAllCourses = function () {
        //Show spin window
        $scope.showSpin = true;
        courseManagementService.getCourseDetails().then(function (result) {
            populateCourseList(result);
            //Hide spin window
            $scope.showSpin = false;
        }, function (error) {
            console.log(error);
        });
    };

    //Used for initializing the controller
    var init = function () {
        getAllCourses();
    } ();

} 
]);