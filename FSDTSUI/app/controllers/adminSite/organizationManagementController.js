/**
Is used to provide all event handling logic for organization management view i.e organizationManagement.html

*/
'use strict';
fsdtsApp.controller('organizationManagementController', ['$scope', 'appConstants', '$location', 'organizationManagementService', 'userProfileService',
function ($scope, appConstants, $location, organizationManagementService, userProfileService) {
    
    $scope.organizationList = [];
    //#region Grid initialization

    var actionColumn = '<div  class="ngCellText"><a href="" ng-click="onActionClick(row.entity,\'programManagement\')">Programs</a> |' +
                                   '<a href="" ng-click="onActionClick(row.entity,\'courseManagement\')">Courses</a> |' +
                                   '<a href="" ng-click="onActionClick(row.entity,\'credentialManagement\')">Credentials</a> |' +
                                   '<a href="" ng-click="onActionClick(row.entity,\'userManagement\')">Users</a></div>';
    $scope.columnDefs = [{ field: 'name', displayName: 'Name', cellTemplate: '<div class="ngCellText"><a href="" ng-click="onActionClick(row.entity,\'organization\')">{{row.getProperty(\'name\')}}</a></div>' },
                         { field: 'type', displayName: 'Type', width: 80, cellClass: 'gridColumn-align' },
                         { displayName: 'Actions', cellTemplate: actionColumn, width: 240, cellClass: 'gridColumn-align' },
                         { field: 'status', displayName: 'Status', width: 80 , cellClass: 'gridColumn-align'}];
    $scope.selectedItems = [];
    $scope.papulateGrid = false;
    //#endregion

    //On select action from grid
    $scope.onActionClick = function (actionObject) {

        //#region Update user parameters
        var params = userProfileService.getUserParams();
        params.organizationId = actionObject.selectedRow.organizationId;
        userProfileService.setUserParams(params)
        //#endregion

        if (actionObject.actionName === 'courseManagement') {
            $location.path('/courseManagement');
        } else if (actionObject.actionName === 'programManagement') {
            $location.path('/programManagement');
        } else if (actionObject.actionName === 'credentialManagement') {
            $location.path('/credentialManagement');
        } else if (actionObject.actionName === 'userManagement') {
            $location.path('/userManagement');
        } else if (actionObject.actionName === 'organization') {
            $location.path('/organization/2');
        }
    };

    //Showing error window
    var showErrorWindow = function (errorMessages) {
        $scope.errorWindowOption.showError = true;
        $scope.errorWindowOption.errorMessages = errorMessages;
        $scope.showSpin = false;
    };

    //Populate organization list
    var populateOrganizationList = function (organizationList) {
        angular.forEach(organizationList, function (organization) {
            $scope.organizationList.push(organizationManagementService.populateOrganizationModel(organization));
        });

        if ($scope.organizationList.length >= 0) {
            $scope.papulateGrid = !$scope.papulateGrid;;
        }
    };

    //Get all organizations details
    var getAllOrganizations = function () {
        //Show spin window
        $scope.showSpin = true;
        organizationManagementService.getOrganizationDetails().then(function (result) {
            populateOrganizationList(result);
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

        getAllOrganizations();
    }();

}
]);