/** Controller descriptions
Is used to provide all event handling logic for user view i.e user.html

*/
'use strict';
fsdtsApp.controller('userController', ['$scope', '$routeParams', 'appConstants', 'userManagementService', '$location', 'userProfileService',
function ($scope, $routeParams, appConstants, userManagementService, $location, userProfileService) {

    //Submit button click handler
    $scope.onSubmit = function (event) {
        event.preventDefault();
        if ($scope.validator.validate()) {  // code for validation
            $scope.validationClass = "valid";
            $scope.confirmWindowOption.actionType = "Submit";
            $scope.confirmWindowOption.showConfirm = true;
        } else {
            $scope.validationClass = "invalid";
        }
    };

    //On cancel button click handler
    $scope.onCancel = function () {
        $scope.confirmWindowOption.actionType = "Cancel";
        $scope.confirmWindowOption.showConfirm = true;
    };

    //call back handler for confirmation window
    $scope.confirmActionHandler = function (actionType, isConfirmed) {
        if ((actionType === 'Submit') && (isConfirmed === true)) {
            //code for submit
            if ($routeParams.actionType === appConstants.OPERATION_TYPE.ADD) { //Add user
                addUser();
            } else {//Edit user
                editUser();
            }
        } else if ((actionType === 'Cancel') && (isConfirmed === true)) { //code for cancel
            resetForm();
        }
    };

    //Showing error window
    var showErrorWindow = function (errorMessages) {
        $scope.errorWindowOption.showError = true;
        $scope.errorWindowOption.errorMessages = errorMessages;
        $scope.showSpin = false;
    };

    //Reset the form control
    var resetForm = function () {
        $scope.userInfo = {
            'status': appConstants.STATUS.ACTIVE
        };
        if (userProfileService.profile.params.userType === appConstants.USER_TYPE.ORGUSER) {
            $location.path('/userManagement/ORGUSER');
        } else {
            $location.path('/userManagement/ADMIN');
        }
    };

    //Service call to add user
    var addUser = function () {
        //Show spin window
        $scope.showSpin = true;
        userManagementService.addUser($scope.userInfo).then(function (result) {
            //Hide spin window
            $scope.showSpin = false;
            //After adding user redirect to user management page
            if (userProfileService.profile.params.userType === appConstants.USER_TYPE.ORGUSER) {
                $location.path('/userManagement/ORGUSER');
            } else {
                $location.path('/userManagement/ADMIN');
            }
        }, function (error) {
            showErrorWindow(error);
        });
    };

    //Service call to edit user
    var editUser = function () {
        //Show spin window
        $scope.showSpin = true;
        userManagementService.editUser($scope.userInfo).then(function () {
            //Show spin window
            $scope.showSpin = false;
            //After updating user redirect to user management page
            if (userProfileService.profile.params.userType === appConstants.USER_TYPE.ORGUSER) {
                $location.path('/userManagement/ORGUSER');
            } else {
                $location.path('/userManagement/ADMIN');
            }
        }, function (error) {
            showErrorWindow(error);
        });
    };

    //Service call to get //Service call to get user details
    var getUser = function () {
        //Show spin window
        $scope.showSpin = true;
        userManagementService.getUserDetails(userProfileService.profile.params.userId).then(function (result) {
            console.log(result);
            $scope.userInfo = userManagementService.populateUserModel(result);
            //Show spin window
            $scope.showSpin = false;
        }, function (error) {
            showErrorWindow(error);
        });
    };
    //Used for initializing the controller
    var init = (function () {
        //#region initialize scope variables
        $scope.actionType = $routeParams.actionType;
        $scope.userType = userProfileService.profile.params.userType;
        $scope.confirmWindowOption = {
            actionType: null,
            showConfirm: false
        };
        $scope.errorWindowOption = {
            showError: false,
            errorMessage: null
        };
        //#endregion

        //All the special initialization for Add/Edit goes here
        if ($routeParams.actionType === appConstants.OPERATION_TYPE.ADD) {
            //Initialize the defalut data model
            $scope.userInfo = {
                'status': appConstants.STATUS.ACTIVE,
                'manageUser': false,
                'manageProject': false,
                'manageOrganization': false
            };

        } else { //Getting the user details if its a edit operation
            getUser();
        }
    })();

}
]);