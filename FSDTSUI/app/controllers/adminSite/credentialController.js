/** Controller descriptions
Is used to provide all event handling logic for credential view i.e credential.html;
*/
'use strict';
fsdtsApp.controller('credentialController', ['$scope', '$routeParams', 'appConstants', 'credentialManagementService', '$location', 'userProfileService',
function ($scope, $routeParams, appConstants, credentialManagementService, $location, userProfileService) {

    //Submit button click handler
    $scope.onSubmit = function (event) {
        event.preventDefault();
        if ($scope.validator.validate()) {  //code for validation
            $scope.validationClass = "valid";
            if ($routeParams.actionType === appConstants.OPERATION_TYPE.ADD) {
                showConfirmWindow();
            } else if ($routeParams.actionType === appConstants.OPERATION_TYPE.EDIT) {
                if (isDirtyForm($scope.credentialInfo)) {//Check dirty form
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
            if ($routeParams.actionType === appConstants.OPERATION_TYPE.ADD) { //Add Credential
                addCredential();
            } else {//Edit credential
                editCredential();
            }
        } else if ((actionType === 'Cancel') && (isConfirmed === true)) { //code for Credential
            resetForm();
        }
    };

    //Check dirty form
    var isDirtyForm = function (credentialInfo) {
        return !angular.equals(credentialInfo, masterCredentialInfo);
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

    //Reset the form control
    var resetForm = function () {
        $scope.credentialInfo = {
            'status': appConstants.STATUS.ACTIVE
        };
        $location.path('/credentialManagement');
    };

    //Service call to add credential
    var addCredential = function () {
        //Show spin window
        $scope.showSpin = true;
        credentialManagementService.addCredential($scope.credentialInfo).then(function (result) {
            //Hide spin window
            $scope.showSpin = false;
            //After adding credential redirect to credential management page
            $location.path('/credentialManagement');
        }, function (error) {
            showErrorWindow(error);
        });
    };

    //Service call to edit credential
    var editCredential = function () {
        //Show spin window
        $scope.showSpin = true;
        credentialManagementService.editCredential($scope.credentialInfo).then(function () {
            //Hide spin window
            $scope.showSpin = false;
            //After updating credential redirect to credential management page
            $location.path('/credentialManagement');
        }, function (error) {
            showErrorWindow(error);
        });
    };

    var masterCredentialInfo;
    //Service call to get credential details
    var getCredential = function () {
        //Show spin window
        $scope.showSpin = true;
        credentialManagementService.getCredentialDetails(userProfileService.profile.params.credentialId).then(function (result) {
            $scope.credentialInfo = credentialManagementService.populateCredentialModel(result);
            masterCredentialInfo = angular.copy($scope.credentialInfo);
            //Hide spin window
            $scope.showSpin = false;
        }, function (error) {
            showErrorWindow(error);
        });
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

        //All the special initialization for Add/Edit goes here
        if ($routeParams.actionType === appConstants.OPERATION_TYPE.ADD) {
            //Initialize the defalut data model
            $scope.credentialInfo = {
                'status': appConstants.STATUS.ACTIVE
            };

        } else { //Getting the credential details if its a edit operation
            getCredential();
        }
    })();
}
]);