/** Controller descriptions
Is used to provide all event handling logic for credential management view i.e credentialManagement.html

*/
'use strict';

fsdtsApp.controller('credentialManagementController', ['$scope', 'appConstants', 'credentialManagementService', '$location', 'userProfileService',
function ($scope, appConstants, credentialManagementService, $location, userProfileService) {

    //#region Scope variable declaration
    $scope.credentialList = [];
    //#endregion
    //#region Grid initialization
    $scope.columnDefs = [{ field: 'name', displayName: 'Name', cellTemplate: '<div class="ngCellText"><a href="" ng-click="onActionClick(row.entity,\'credential\')">{{row.getProperty(\'name\')}}</a></div>' },
                         { field: 'status', displayName: 'Status', width: 80, cellClass: 'gridColumn-align' }];
    $scope.selectedItems = [];
    $scope.papulateGrid = false;
    //#endregion

    //On select action from grid
    $scope.onActionClick = function (actionObject) {
        //#region Update user parameters
        var params = userProfileService.getUserParams();
        params.credentialId = actionObject.selectedRow.credentialId;
        userProfileService.setUserParams(params)
        //#endregion

        if (actionObject.actionName === 'credential') {
            $location.path('/credential/2');
        }
    };

    //Showing error window
    var showErrorWindow = function (errorMessages) {
        $scope.errorWindowOption.showError = true;
        $scope.errorWindowOption.errorMessages = errorMessages;
        $scope.showSpin = false;
    };

    //Service call to populate credential list
    var populateCredentialList = function (credentialList) {
        angular.forEach(credentialList, function (credential) {
            $scope.credentialList.push(credentialManagementService.populateCredentialModel(credential));
        });

        if ($scope.credentialList.length >= 0) {
            $scope.papulateGrid = !$scope.papulateGrid;
        }
    };

    //Get all credentials
    var getAllCredentials = function () {
        //Show spin window
        $scope.showSpin = true;
        credentialManagementService.getCredentialDetails().then(function (result) {
            populateCredentialList(result);
            //Hide spin window
            $scope.showSpin = false;
        }, function (error) {
            showErrorWindow(error);
        });
    };

    //Used for initializing the controller
    var init = function () {
        //#region initialize scope variables
        $scope.errorWindowOption = {
            showError: false,
            errorMessage: null
        };
        //#endregion
        getAllCredentials();
    }();

}
]);