/** Controller descriptions
Is used to provide all event handling logic for program management view i.e programManagement.html

*/
'use strict';
fsdtsApp.controller('programManagementController', ['$scope', 'appConstants', '$location', 'programManagementService', 'userProfileService',
    function ($scope, appConstants, $location, programManagementService, userProfileService) {

        //TODO: Optimization : Dummy implementation need to be removed
        $scope.programList = [];
        //#region Grid initialization
        $scope.columnDefs = [{ field: 'name', displayName: 'Name', cellTemplate: '<div class="ngCellText"><a href="" ng-click="onActionClick(row.entity,\'program\')">{{row.getProperty(\'name\')}}</a></div>' },
                             { field: 'status', displayName: 'Status', width: 80, cellClass: 'gridColumn-align' }];
        $scope.selectedItems = [];
        $scope.papulateGrid = false;
        //#endregion
        
        //On select action from grid
        $scope.onActionClick = function (actionObject) {
            userProfileService.profile.params.programId = actionObject.selectedRow.programId;;
            if (actionObject.actionName === 'program') {
                $location.path('/program/2');
            }
        };

        //Showing error window
        var showErrorWindow = function (errorMessages) {
            $scope.errorWindowOption.showError = true;
            $scope.errorWindowOption.errorMessages = errorMessages;
            $scope.showSpin = false;
        };

        var populateProgramList = function (programList) {
            angular.forEach(programList, function (program) {
                $scope.programList.push(programManagementService.populateProgramModel(program));
            });

            if ($scope.programList.length >= 0) {
                $scope.papulateGrid = !$scope.papulateGrid;
            }
        };

        //Get all programs
        var getAllPrograms = function () {
            //Show spin window
            $scope.showSpin = true;
            programManagementService.getProgramDetails().then(function (result) {
                populateProgramList(result);
                //Hide spin window
                $scope.showSpin = false;
            }, function (error) {
                showErrorWindow(error);
            });
        };

        //Used for initializing the controller
        var init = function () {
            $scope.errorWindowOption = {
                showError: false,
                errorMessage: null
            };
            getAllPrograms();
        }();

    }
]);