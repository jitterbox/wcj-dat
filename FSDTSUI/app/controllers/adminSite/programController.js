/** Controller descriptions
Is used to provide all event handling logic for program view i.e program.html

*/
'use strict';
fsdtsApp.controller('programController', ['$scope', 'appConstants', '$routeParams', '$location', 'programManagementService', 'userProfileService',
function ($scope, appConstants, $routeParams, $location, programManagementService, userProfileService) {

    //Submit button click handler
    $scope.onSubmit = function (event) {
        event.preventDefault();
        if ($scope.validator.validate()) {  //code for validation
            $scope.validationClass = "valid";
            if ($routeParams.actionType === appConstants.OPERATION_TYPE.ADD) {
                showConfirmWindow();
            } else if ($routeParams.actionType === appConstants.OPERATION_TYPE.EDIT) {
                if (isDirtyForm($scope.programInfo)) {//Check dirty form
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
            if ($routeParams.actionType === appConstants.OPERATION_TYPE.ADD) { //Add Program
                addProgram();
            } else {//Edit Program
                editProgram();
            }
        } else if ((actionType === 'Cancel') && (isConfirmed === true)) { //code for cancel
            resetForm();
        }
    };

    //Check dirty form
    var isDirtyForm = function (programInfo) {
        return !angular.equals(programInfo, masterProgramInfo);
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
        $scope.programInfo = {
            'status': appConstants.STATUS.ACTIVE
        };
        $location.path('/programManagement');
    };

    //Service call to add program
    var addProgram = function () {
        //Show spin window
        $scope.showSpin = true;
        programManagementService.addProgram($scope.programInfo).then(function () {
            //Hide spin window
            $scope.showSpin = false;
            //After adding program redirect to program management page
            $location.path('/programManagement');
        }, function (error) {
            showErrorWindow(error);
        });
    };

    //Service call to edit program
    var editProgram = function () {
        //Show spin window
        $scope.showSpin = true;
        programManagementService.editProgram($scope.programInfo).then(function () {
            //Hide spin window
            $scope.showSpin = false;
            //After updating program redirect to program management page
            $location.path('/programManagement');
        }, function (error) {
            showErrorWindow(error);
        });
    };

    var masterProgramInfo;
    //Service call to get program details
    var getProgram = function () {
        //Show spin window
        $scope.showSpin = true;
        programManagementService.getProgramDetails(userProfileService.profile.params.programId).then(function (result) {
            $scope.programInfo = programManagementService.populateProgramModel(result);
            masterProgramInfo = angular.copy($scope.programInfo);
            //Hide spin window
            $scope.showSpin = false;
        }, function (error) {
            showErrorWindow(error);
        });
    };

    //Service call to get all common program list
    var loadCommonProgramDDL = function () {
        programManagementService.papulateCommonProgramDDL().then(function (result) {
            $scope.commonProgramGroupingsList = result;
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
            $scope.programInfo = {
                'status': appConstants.STATUS.ACTIVE
            };
        } else { //getting the program details if its a edit operation
            getProgram();
        }
        //getting common program list from maintanance controller
        loadCommonProgramDDL();
    })();

}
]);
