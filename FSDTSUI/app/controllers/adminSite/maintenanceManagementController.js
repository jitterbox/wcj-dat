/**
Is used to provide all event handling logic for user management view i.e maintenceManagement.html

*/
'use strict';
fsdtsApp.controller('maintenanceManagementController', ['$scope', '$routeParams', 'appConstants', 'maintenanceManagementService', '$location', 'userProfileService',
 function ($scope, $routeParams, appConstants, maintenanceManagementService, $location, userProfileService) {

     //#region Scope variable declaration
     $scope.maintenanceList = [];
     $scope.selectedMaintenance = null;
     $scope.maintenanceInfo = {};
     $scope.showAddButton = true;
     //#endregion
     var masterMaintenanceInfo;
     //Submit button click handler
     $scope.onSubmit = function (event) {
         event.preventDefault();
         if ($scope.validator.validate()) {  //code for validation
             $scope.validationClass = "valid";
             //if (checkDuplicateGrouping($scope.maintenanceInfo.commonProgramGroupings)) {
             //    showErrorWindow(['Common Programs Groupings name should not be duplicate']);
             //} else {
             //    if ($scope.showAddButton === true) {
             //        showConfirmWindow();
             //    } else if ($scope.showAddButton === false) {
             //            showConfirmWindow();
             //    }
             //}

             //TODO: Need optimization
             if ($scope.showAddButton === true) { //For add 
                 if (checkDuplicateGrouping($scope.maintenanceInfo.commonProgramGroupings)) {
                     showErrorWindow(['Common Programs Groupings name should not be duplicate']);
                 } else {
                     showConfirmWindow();
                 }
             } else if ($scope.showAddButton === false) {//For edit
                 if (isDirtyForm($scope.maintenanceInfo)) {//Check dirty form
                     showConfirmWindow();
                 } else {
                     showErrorWindow(['Edit form data before submit.']);
                 }
             }
         } else {
             $scope.validationClass = "invalid";
         }
     };

     //Delete button click handler
     $scope.onDelete = function (maintenance) {
         $scope.selectedMaintenance = maintenance;
         $scope.confirmWindowOption.actionType = "Delete";
         $scope.confirmWindowOption.showConfirm = true;
     };

     //call back handler for confirmation window
     $scope.confirmActionHandler = function (actionType, isConfirmed) {
         if ((actionType === 'Submit') && (isConfirmed === true)) {
             //code for submit
             if ($scope.showAddButton === true) { //Add maintenance
                 addMaintenance();
             } else {//Edit maintenance
                 editMaintenance();
                 $scope.showAddButton = true;
             }
         } else if ((actionType === 'Delete') && (isConfirmed === true)) { //code for delete
             deleteMaintenance($scope.selectedMaintenance);
         } else if ((actionType === 'Cancel') && (isConfirmed === true)) { //code for cancel
             resetForm();
             $scope.showAddButton = true;
         }
         //Clear selected Row
         $scope.selectedMaintenance = null;
     };

     //on edit button click handler
     $scope.onActionClick = function (maintenance) {
         //TODO: Need optimization
         masterMaintenanceInfo = angular.copy(maintenance);
         delete masterMaintenanceInfo.commonProgramsGroupingId;

         $scope.showAddButton = false;
         userProfileService.profile.params.commonProgramsGroupingId = maintenance.commonProgramsGroupingId;;
         $scope.maintenanceInfo = {
             commonProgramGroupings: maintenance.commonProgramGroupings
         };
     };

     //On cancel button click handler
     $scope.onCancel = function () {
         $scope.confirmWindowOption.actionType = "Cancel";
         $scope.confirmWindowOption.showConfirm = true;
     };

     //Check dirty form
     var isDirtyForm = function (maintenanceInfo) {
         return !angular.equals($scope.maintenanceInfo, masterMaintenanceInfo);
     };

     //Showing error window
     var showErrorWindow = function (errorMessage) {
         $scope.errorWindowOption.showError = true;
         $scope.errorWindowOption.errorMessages = errorMessage;
         $scope.showSpin = false;
     };

     //Show confirm window
     var showConfirmWindow = function () {
         $scope.confirmWindowOption.actionType = "Submit";
         $scope.confirmWindowOption.showConfirm = true;
     };

     //Reset the form control
     var resetForm = function () {
         $scope.maintenanceInfo = {
             commonProgramGroupings: ''
         };
         $scope.maintenanceList = [];
         getAllMaintenances();
     };

     //Service call to edit maintenance
     var editMaintenance = function () {
         //Show spin window
         $scope.showSpin = true;
         maintenanceManagementService.editMaintenance($scope.maintenanceInfo).then(function () {
             //Show spin window
             $scope.showSpin = false;
             //After updating  maintenance redirect to course management page
             resetForm();
         }, function (error) {
             showErrorWindow(error);
         });
     };

     //Service call to add maintenance
     var addMaintenance = function () {
         //Show spin window
         $scope.showSpin = true;
         maintenanceManagementService.addMaintenance($scope.maintenanceInfo).then(function (result) {
             //Hide spin window
             $scope.showSpin = false;
             //After adding maintenance redirect to course management page
             resetForm();
         }, function (error) {
             showErrorWindow(error);
         });
     };

     //Service call to delete maintenance
     var deleteMaintenance = function (selectedMaintenance) {
         //Show spin window
         $scope.showSpin = true;
         maintenanceManagementService.deleteMaintenance(selectedMaintenance).then(function (result) {
             //Hide spin window
             $scope.showSpin = false;
             //After adding course redirect to period management page
             resetForm();
         }, function (error) {
             showErrorWindow(error);
         });
     };

     //Service call to populate maitenance list 
     var populateMaintenanceList = function (maintenanceList) {
         angular.forEach(maintenanceList, function (maintenance) {
             $scope.maintenanceList.push(maintenanceManagementService.populateMaintenanceModel(maintenance));
         });
     };

     //Get all Maintenace
     var getAllMaintenances = function () {
         maintenanceManagementService.getMaintenanceDetails().then(function (result) {
             populateMaintenanceList(result);
         }, function (error) {
             showErrorWindow(error);
         });
     };

     //restrict duplicate common program groupings
     var checkDuplicateGrouping = function (groupName) {
         var hasDuplicate = false;
         var maintenanceList = $scope.maintenanceList.map(function (maintenanceObj) {
             return maintenanceObj.commonProgramGroupings
         });
         if (maintenanceList.indexOf(groupName) >= 0) {
             hasDuplicate = true;
         }
         return hasDuplicate;
     };

     //used for initializing the controller
     var init = function () {
         //#region initialize scope variables
         // $scope.yearList = getYearList(userProfileService.profile.params.startYear, userProfileService.profile.params.endYear);
         $scope.actionType = $routeParams.actionType;
         $scope.confirmWindowOption = {
             actionType: null,
             showConfirm: false
         };
         $scope.errorWindowOption = {
             showError: false,
             errorMessages: null
         };
         //#endregion
         getAllMaintenances();
     }();

 }]);