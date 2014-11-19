/** Controller descriptions
Is used to provide all event handling logic for user management view i.e userManagement.html;
*/
'use strict';
fsdtsApp.controller('userManagementController', ['$scope', 'appConstants', 'userManagementService', '$location', 'userProfileService',
function ($scope, appConstants, userManagementService, $location, userProfileService) {

    //TODO: Optimization : Dummy implementation need to be removed
    $scope.userList = [];
    //#region Grid initialization
    $scope.columnDefs = [{ field: 'lastname', displayName: 'LastName', cellTemplate: '<div class="ngCellText"><a href="" ng-click="onActionClick(row.entity,\'user\')">{{row.getProperty(\'lastname\')}}</a></div>' },
                         { field: 'firstname', displayName: 'FirstName', width: 80, cellClass: 'gridColumn-align' },
                         { field: 'emailAddress', displayName: 'Email', width: 80, cellClass: 'gridColumn-align' },
                         { field: 'status', displayName: 'Status', width: 80, cellClass: 'gridColumn-align'}];
    $scope.selectedItems = [];
    $scope.papulateGrid = false;
    //#endregion

    //On select action from grid
    $scope.onActionClick = function (actionObject) {
        userProfileService.profile.params.userId = actionObject.selectedRow.userId; ;
        if (actionObject.actionName === 'user') {
            $location.path('/user/2');
        }
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
            console.log(error);
        });
    };

    //used for initializing the controller
    var init = function () {
        getAllUsers();
    } ();

} ]);