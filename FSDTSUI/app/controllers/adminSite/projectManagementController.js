/** Controller descriptions
Is used to provide all event handling logic for course management view i.e courseManagement.html

*/
'use strict';
fsdtsApp.controller('projectManagementController', ['$scope', 'appConstants', 'projectManagementService', '$location', 'userProfileService',
    function ($scope, appConstants, projectManagementService, $location, userProfileService) {

        $scope.projectList = [];
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
            userProfileService.profile.params.projectId = actionObject.selectedRow.projectId;
            userProfileService.profile.params.startYear = actionObject.selectedRow.startYear;
            userProfileService.profile.params.endYear = actionObject.selectedRow.endYear;
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

        //On select program from grid
        //$scope.onProjectSelect = function (selectedProject) {
        //    $scope.userProfile.params.projectId = selectedProject.projectId;
        //    //redirect to edit project UI
        //    $location.path('/project/2');
        //};

        //Showing error window
        var showErrorWindow = function (errorMessages) {
            $scope.errorWindowOption.showError = true;
            $scope.errorWindowOption.errorMessages = errorMessages;
            $scope.showSpin = false;
        };

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
            $scope.errorWindowOption = {
                showError: false,
                errorMessage: null
            };
            getAllProjects();
        } ();

    }
]);