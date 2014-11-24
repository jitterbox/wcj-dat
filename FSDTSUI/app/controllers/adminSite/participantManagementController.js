/** Controller descriptions
Is used to provide all event handling logic for course management view i.e courseManagement.html;
*/
'use strict';

fsdtsApp.controller('participantManagementController', ['$scope', 'appConstants', 'courseManagementService', '$location', 'userProfileService', 'participantManagementService',
function ($scope, appConstants, courseManagementService, $location, userProfileService, participantManagementService) {

    //#region Scope variable declaration
    $scope.organizationDDLList = [];
    $scope.trackingItemDDLList = [];
    $scope.participantInfo = {};
    $scope.isEmptyProjectOrganization = false;
    $scope.selectedParticipant = null;
    $scope.isValidTrackingItem = true;
    $scope.isValidFormat = true;
    //#endregion

    //Submit button click handler
    $scope.onSubmit = function (event) {
        if (customValidate()) { 
            $scope.confirmWindowOption.actionType = "Submit";
            $scope.confirmWindowOption.showConfirm = true;
        }

    };

    //call back handler for confirmation window
    $scope.confirmActionHandler = function (actionType, isConfirmed) {
        if ((actionType === 'Submit') && (isConfirmed === true)) {
            addToProject();
        } else if ((actionType === 'Delete') && (isConfirmed === true)) {
            deleteParticipant();
        }
        $scope.selectedParticipant = null;
    };

    //OnChange Organixation DDL
    $scope.onOrganizationSelect = function () {
        resetDependentDDL('organization');
    };

    //OnChange format DDL
    $scope.onFormatSelect = function (selectedFormat) {
        if (selectedFormat !== null) {
            loadTrackingItemDDL(selectedFormat);
            $scope.isValidFormat = true;
        } else {
            $scope.isValidFormat = false;
            resetDependentDDL('format');
        }

    };

    //OnChange tracking DDL
    $scope.onTrackingItemSelect = function () {
        //Checking for null value
        if ($scope.participantInfo.selectedTrackingItem !== null) {
            $scope.isValidTrackingItem = true;
        } else {
            $scope.isValidTrackingItem = false;
        }
    };

    //OnClick delete button
    $scope.onDelete = function (selectedRow) {
        //Showing confirmation window
        $scope.confirmWindowOption.actionType = "Delete";
        $scope.confirmWindowOption.showConfirm = true;
        $scope.selectedParticipant = selectedRow;
    };

    //OnSelect Row
    $scope.onRowSelect = function () {
        //Highlight row style
        if ($scope.lastSelected) {
            $scope.lastSelected.selectedRow = '';
        }
        this.selectedRow = 'selectedRow';
        $scope.lastSelected = this;
    };

    //Showing error window
    var showErrorWindow = function (errorMessages) {
        $scope.errorWindowOption.showError = true;
        $scope.errorWindowOption.errorMessages = errorMessages;
        $scope.showSpin = false;
    };

    var customValidate = function () {
        var isValid = true;
        if ($scope.participantInfo.selectedTrackingItem) {
            $scope.isValidTrackingItem = true;
            
        } else {
            $scope.isValidTrackingItem = false;
            isValid = false;
        }

        if ($scope.participantInfo.format) {
            $scope.isValidFormat = true;
        } else {
            
            $scope.isValidFormat = false;
            isValid = false;
        }
        return isValid;
    };

    //Service call to delete the selected participant
    var deleteParticipant = function () {
        //Show spin window
        $scope.showSpin = true;
        participantManagementService.deleteParticipant($scope.selectedParticipant).then(function (result) {
            //Hide spin window
            $scope.showSpin = false;
            //Refresh the grid
            loadParticipantList();
        }, function (error) {
            showErrorWindow(error);
        });
    };

    //Reset all the dependdent field of organization DDL
    var resetDependentDDL = function (ddlType) {
        if (ddlType === 'organization') {
            $scope.participantInfo.format = null;
            $scope.trackingItemDDLList = [];
            $scope.participantInfo.selectedTrackingItem = null;
        } else if (ddlType === 'format') {
            $scope.trackingItemDDLList = [];
            $scope.participantInfo.selectedTrackingItem = null;
        }

    };

    //Service call to add participant to the project
    var addToProject = function () {
        //Show spin window
        $scope.showSpin = true;
        participantManagementService.addToProject($scope.participantInfo).then(function () {
            //Hide spin window
            $scope.showSpin = false;
            //Refresh the grid
            loadParticipantList();
        }, function (error) {
            showErrorWindow(error);
        });

    };

    //Service call to load the tracking item
    var loadTrackingItemDDL = function (selectedFormat) {
        $scope.trackingItemDDLList = participantManagementService.papulateTrackingItemDDL(selectedFormat, $scope.participantInfo.selectedOrganization);
    };

    //Service call to load organization DDL
    var loadOrganizationDDL = function () {
        participantManagementService.papulateOrganizationDDL().then(function (result) {
            $scope.organizationDDLList = result;
            $scope.participantInfo.selectedOrganization = $scope.organizationDDLList[0];
        }, function (error) {
            showErrorWindow(error);
        });
    };

    //Service call to load participant grid
    var loadParticipantList = function () {
        //Show spin window
        $scope.showSpin = true;
        participantManagementService.getParticipantList().then(function (result) {
            //Hide spin window
            $scope.showSpin = false;
            $scope.projectOrganizationList = result;
            //Checking for empty object
            $scope.isEmptyProjectOrganization = isEmptyDict($scope.projectOrganizationList);
        }, function (error) {
            showErrorWindow(error);
        });
    };

    //Used for initializing the controller
    var init = function () {
        //#region initialize scope variables
        $scope.confirmWindowOption = {
            actionType: null,
            showConfirm: false
        };
        $scope.errorWindowOption = {
            showError: false,
            errorMessage: null
        };
        //#endregion
        loadOrganizationDDL();
        loadParticipantList();
    }();

}
]);