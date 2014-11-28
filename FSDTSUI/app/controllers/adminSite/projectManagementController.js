/** Controller descriptions
Is used to provide all event handling logic for project management view i.e projectManagement.html

*/
'use strict';
fsdtsApp.controller('projectManagementController', ['$scope', 'appConstants', 'projectManagementService', '$location', 'userProfileService',
    function ($scope, appConstants, projectManagementService, $location, userProfileService) {

        //#region Scope variable declaration
        $scope.projectList = [];
        //#endregion
        //#region Grid initialization
        var actionColumn = '<div class="ngCellText"><a href="" ng-click="onActionClick(row.entity,\'periodManagement\')" >Periods </a> |' +
                                  '<a href="" ng-click="onActionClick(row.entity,\'participantManagement\')">Participants </a> |' +
                                  '<a href="" ng-click="onActionClick(row.entity,\'measureManagement\')" >Measures </a> |' +
                                  '<a href="" ng-click="onActionClick(row.entity,\'reportManagement\')">Reports </a></div>';
        $scope.columnDefs = [{ field: 'name', displayName: 'Name', cellTemplate: '<div class="ngCellText"><a href="" ng-click="onActionClick(row.entity,\'project\')">{{row.getProperty(\'name\')}}</a></div>' },
                             { field: 'type', displayName: 'Type', cellClass: 'gridColumn-align' },
                             { displayName: 'Actions', cellTemplate: actionColumn, width: 250, cellClass: 'gridColumn-align' },
                             { field: 'status', displayName: 'Status', width: 80, cellClass: 'gridColumn-align'}];
        $scope.selectedItems = [];
        $scope.papulateGrid = false;
        //#endregion

        //On select action from grid
        $scope.onActionClick = function (actionObject) {     
            //#region Update user parameters
            var params = userProfileService.getUserParams();
            params.projectId = actionObject.selectedRow.projectId;
            params.startYear = actionObject.selectedRow.startYear;
            params.endYear = actionObject.selectedRow.endYear;
            userProfileService.setUserParams(params)
            //#endregion

            if (actionObject.actionName === 'periodManagement') {
                $location.path('/periodManagement');
            } else if (actionObject.actionName === 'participantManagement') {
                $location.path('/participantManagement');
            } else if (actionObject.actionName === 'measureManagement') {
                $location.path('/measureManagement');
            } else if (actionObject.actionName === 'reportManagement') {
                $location.path('/reportManagement');
            } else if (actionObject.actionName === 'project') {
                $location.path('/project/2');
            }
        };

        //Showing error window
        var showErrorWindow = function (errorMessages) {
            $scope.errorWindowOption.showError = true;
            $scope.errorWindowOption.errorMessages = errorMessages;
            $scope.showSpin = false;
        };

        //Service call to populate project list
        var populateProjectList = function (projectList) {
            angular.forEach(projectList, function (project) {
                $scope.projectList.push(projectManagementService.populateProjectModel(project));
            });

            if ($scope.projectList.length >= 0) {
                $scope.papulateGrid = !$scope.papulateGrid;
            }
        };

        //Get all projects
        var getAllProjects = function () {
            //Show spin window
            $scope.showSpin = true;
            projectManagementService.getProjectDetails().then(function (result) {
                populateProjectList(result);
                //Hide spin window
                $scope.showSpin = false;
            }, function (error) {
                showErrorWindow(error);
            });
        };
        //used for initializing the controller
        var init = function () {
            //#region initialize scope variables
            $scope.errorWindowOption = {
                showError: false,
                errorMessage: null
            };
            //#endregion
            getAllProjects();
        } ();

    }
]);