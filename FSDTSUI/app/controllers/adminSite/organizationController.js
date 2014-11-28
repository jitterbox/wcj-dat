/**
Is used to provide all event handling logic for organization view i.e organization.html

*/
'use strict';
fsdtsApp.controller('organizationController', ['$scope', '$routeParams', 'appConstants', 'organizationManagementService', '$location', 'userProfileService',
function ($scope, $routeParams, appConstants, organizationManagementService, $location, userProfileService) {
    //TODO : need to be optimized

    $scope.onSubmit = function (event) {
        event.preventDefault();
        if ($scope.validator.validate()) {  //code for validation
            $scope.validationClass = "valid";
            if ($routeParams.actionType === appConstants.OPERATION_TYPE.ADD) {
                showConfirmWindow();
            } else if ($routeParams.actionType === appConstants.OPERATION_TYPE.EDIT) {
                if (isDirtyForm($scope.organizationInfo)) {//Check dirty form
                    showConfirmWindow();
                } else {
                    showErrorWindow(['Edit form data before submit.']);
                }
            }

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
            if ($routeParams.actionType === appConstants.OPERATION_TYPE.ADD) { //Add Organization
                addOrganization();
            } else {//Edit Organization
                editOrganization();
            }
        } else if ((actionType === 'Cancel') && (isConfirmed === true)) { //code for cancel
            resetForm();
        }
    };

    var isDirtyForm = function (organizationInfo) {
        return !angular.equals(organizationInfo, masterOrganizationInfo);
    };

    //Showing error window
    var showErrorWindow = function (errorMessages) {
        $scope.errorWindowOption.showError = true;
        $scope.errorWindowOption.errorMessages = errorMessages;
        $scope.showSpin = false;
    };

    //Show confirm window
    var showConfirmWindow = function () {
        $scope.confirmWindowOption.actionType = "Submit";
        $scope.confirmWindowOption.showConfirm = true;
    };

    //Service call to add organization
    var addOrganization = function () {
        //Show spin window
        $scope.showSpin = true;
        organizationManagementService.addOrganization($scope.organizationInfo).then(function () {
            //Hide spin window
            $scope.showSpin = false;
            $location.path('/organizationManagement');
        }, function (error) {
            showErrorWindow(error);
        });
    };

    //Service call to edit organization
    var editOrganization = function () {
        //Show spin window
        $scope.showSpin = true;
        organizationManagementService.editOrganization($scope.organizationInfo).then(function (result) {
            //Hide spin window
            $scope.showSpin = false;
            $location.path('/organizationManagement');
        }, function (error) {
            showErrorWindow(error);
        });
    };

    var masterOrganizationInfo;
    //Service call to get organization detail
    var getOrganization = function () {
        //Show spin window
        $scope.showSpin = true;
        organizationManagementService.getOrganizationDetails(userProfileService.profile.params.organizationId).then(function (result) {
            $scope.organizationInfo = organizationManagementService.populateOrganizationModel(result);
            masterOrganizationInfo = angular.copy($scope.organizationInfo);
            //Hide spin window
            $scope.showSpin = false;
        }, function (error) {
            showErrorWindow(error);
        });
    };

    //Reset the form control
    var resetForm = function () {
        $scope.organizationInfo = {};
        $location.path('/organizationManagement');
    };

    //Used for initializing the controller
    var init = (function () {
        //#region initialize scope variables
        $scope.actionType = $routeParams.actionType;
        $scope.confirmWindowOption = {
            actionType: null,
            showConfirm: false
        };

        $scope.errorWindowOption = {
            showError: false,
            errorMessage: null
        };

        //#endregion
        //All the special initalization for Add/Edit goes here
        if ($routeParams.actionType === appConstants.OPERATION_TYPE.ADD) {
            $scope.organizationInfo = {
                'status': appConstants.STATUS.ACTIVE,
                'type': 'TP'
            };
            console.log('add operation');
        } else {
            getOrganization();
        }
    })();
}
]);