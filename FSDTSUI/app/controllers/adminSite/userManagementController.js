/** Controller descriptions
Is used to provide all event handling logic for user management view i.e userManagement.html;
*/
'use strict';
fsdtsApp.controller('userManagementController', ['$scope', 'appConstants', 'userManagementService', '$location', 'userProfileService',
function ($scope, appConstants, userManagementService, $location, userProfileService) {

    //TODO: Optimization : Dummy implementation need to be removed
    $scope.userList = [];
    //#region Grid initialization
    $scope.columnDefs = [{ field: 'lastname', displayName: 'Last Name', cellTemplate: '<div class="ngCellText"><a href="" ng-click="onActionClick(row.entity,\'user\')">{{row.getProperty(\'lastname\')}}</a></div>' },
                         { field: 'firstname', displayName: 'First Name'},
                         { field: 'emailAddress', displayName: 'Email'},
                         { field: 'status', displayName: 'Status', width: 80, cellClass: 'gridColumn-align'}];
    $scope.selectedItems = [];
    $scope.papulateGrid = false;
    $scope.gridOptions = { 'searchByColumn': 'lastname','searchPlaceHolder' : 'Last Name'};
    //#endregion

    //On select action from grid
    $scope.onActionClick = function (actionObject) {
        //#region Update user parameters
        var params = userProfileService.getUserParams();
        params.userId = actionObject.selectedRow.userId;
        userProfileService.setUserParams(params)
        //#endregion

        if (actionObject.actionName === 'user') {
            $location.path('/user/2');
        }
    };

    //Showing error window
    var showErrorWindow = function (errorMessages) {
        $scope.errorWindowOption.showError = true;
        $scope.errorWindowOption.errorMessages = errorMessages;
        $scope.showSpin = false;
    };

    var populateUserList = function (userList) {
        angular.forEach(userList, function (user) {
            $scope.userList.push(userManagementService.populateUserModel(user));
        });

        if ($scope.userList.length >= 0) {
            $scope.papulateGrid = !$scope.papulateGrid;
        }
    };

    //Get all users
    var getAllUsers = function () {
        //Show spin window
        $scope.showSpin = true;
        userManagementService.getUserDetails().then(function (result) {
            populateUserList(result);
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
        getAllUsers();
    } ();

} ]);