/**
Is used to provide all event handling logic for user management view i.e periodManagement.html

*/
'use strict';
fsdtsApp.controller('periodManagementController', ['$scope', '$routeParams', 'appConstants', 'periodManagementService', '$location', 'userProfileService',
 function ($scope, $routeParams, appConstants, periodManagementService, $location, userProfileService) {

     //TODO: Optimization : Dummy implementation need to be removed
     $scope.value = " ";
     $scope.periodList = [];
     $scope.periodStartDate = [];
     $scope.selectedPeriod = null;
     $scope.periodInfo = {};

     //Submit button click handler
     $scope.onSubmit = function (event) {
         event.preventDefault();
         if ($scope.validator.validate() && customVlaidate()) {  // code for validation
             $scope.validationClass = "valid";
             $scope.confirmWindowOption.actionType = "Submit";
             $scope.confirmWindowOption.showConfirm = true;
         } else {
             $scope.validationClass = "invalid";
         }
     };

     //Delete button click handler
     $scope.onDelete = function (period) {
         $scope.selectedPeriod = period;
         $scope.confirmWindowOption.actionType = "Delete";
         $scope.confirmWindowOption.showConfirm = true;
     };

     //call back handler for confirmation window
     $scope.confirmActionHandler = function (actionType, isConfirmed) {
         if ((actionType === 'Submit') && (isConfirmed === true)) {
             //code for submit
             addPeriod();
         } else if ((actionType === 'Delete') && (isConfirmed === true)) { //code for delete
             deletePeriod($scope.selectedPeriod);
         }
         //Clear selected Row
         $scope.selectedPeriod = null;
     };

     //custom validator for start date and end date
     $scope.isValidDate = true;
     $scope.isValideDeadLineDate = true;
     $scope.validateDate = function (startDate, endDate, deadLineDate) {
         if (Date.parse(startDate) > Date.parse(endDate)) {
             $scope.isValidDate = false;
         } else {
             $scope.isValidDate = true;
         }
         if (Date.parse(deadLineDate) && (Date.parse(deadLineDate) > Date.parse(endDate) || Date.parse(deadLineDate) < Date.parse(startDate))) {
             $scope.isValideDeadLineDate = false;
         } else {
             $scope.isValideDeadLineDate = true;
         }
     };

     //custom validation logic goes here
     var customVlaidate = function () {
         return $scope.isValidDate && $scope.isValideDeadLineDate;
     }

     //Showing error window
     var showErrorWindow = function (errorMessage) {
         $scope.errorWindowOption.showError = true;
         $scope.errorWindowOption.errorMessage = errorMessage;
         $scope.showSpin = false;
     };

     //Reset the form control
     var resetForm = function () {
         $scope.periodInfo = {
             title: '',
             startDate: '',
             endDate: '',
             deadlineDate: ''
         };
         $scope.periodList = [];
         getAllPeriods();
     };


     //Service call to add period
     var addPeriod = function () {
         //Show spin window
         $scope.showSpin = true;
         periodManagementService.addPeriod($scope.periodInfo).then(function (result) {
             //Hide spin window
             $scope.showSpin = false;
             //After adding course redirect to course management page
             resetForm();
         }, function (error) {
             showErrorWindow(error);
         });
     };

     //Service call to delete period
     var deletePeriod = function (selectedPeriod) {
         //Show spin window
         $scope.showSpin = true;
         periodManagementService.deletePeriod(selectedPeriod).then(function (result) {
             console.log(result);
             //Hide spin window
             $scope.showSpin = false;
             //After adding course redirect to course management page
             resetForm();
         }, function (error) {
             showErrorWindow(error);
         });
     };

     var populatePeriodList = function (periodList) {
         angular.forEach(periodList, function (period) {
             $scope.periodList.push(periodManagementService.populatePeriodModel(period));
         });
     };

     //Get all periods
     var getAllPeriods = function () {
         periodManagementService.getPeriodDetails().then(function (result) {
             console.log(result);
             populatePeriodList(result);
         }, function (error) {
             showErrorWindow(error);
         });
     };

     //Return year list from current year to current year+10 
     var getYearList = function (startYear, endYear) {
         var yearList = [];
         for (var i = startYear; i <= endYear; i++) {
             yearList.push((i).toString());
         }
         return yearList;
     };

     //used for initializing the controller
     var init = function () {
         //#region initialize scope variables
         $scope.yearList = getYearList(userProfileService.profile.params.startYear, userProfileService.profile.params.endYear);
         $scope.actionType = $routeParams.actionType;
         $scope.periodInfo = { 'year': userProfileService.profile.params.startYear };
         $scope.confirmWindowOption = {
             actionType: null,
             showConfirm: false
         };
         $scope.errorWindowOption = {
             showError: false,
             errorMessage: null
         };
         //#endregion
         getAllPeriods();
     } ();

 } ]); 