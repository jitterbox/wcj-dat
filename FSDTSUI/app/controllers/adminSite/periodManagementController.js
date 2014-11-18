/**
Is used to provide all event handling logic for user management view i.e periodManagement.html

*/
'use strict';
fsdtsApp.controller('periodManagementController', ['$scope', '$routeParams', 'appConstants', 'periodManagementService', '$location', 'userProfileService',
 function ($scope, $routeParams, appConstants, periodManagementService, $location, userProfileService) {
     $scope.value = " ";

     //TODO: Optimization : Dummy implementation need to be removed
     $scope.periodList = [];
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

     //Delete button click handler
     $scope.onDelete = function () {
         $scope.confirmWindowOption.actionType = "Delete";
         $scope.confirmWindowOption.showConfirm = true;
     };

     //call back handler for confirmation window
     $scope.confirmActionHandler = function (actionType, isConfirmed) {
         if ((actionType === 'Submit') && (isConfirmed === true)) {
             //code for submit
             addPeriod();
         } else if ((actionType === 'Delete') && (isConfirmed === true)) { //code for delete
             deletePeriod();
         }
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
         // $location.path('/periodManagement');
     };


     //Service call to add course
     var addPeriod = function () {
         //Show spin window
         $scope.showSpin = true;
         periodManagementService.addPeriod($scope.periodInfo).then(function (result) {
             //Hide spin window
             $scope.showSpin = false;
             //After adding course redirect to course management page
             resetForm();
         }, function (error) {
             alert(error);
         });
     };

     //Service call to delete course
     var deletePeriod = function () {
         //Show spin window
         $scope.showSpin = true;
         periodManagementService.deletePeriod($scope.periodInfo).then(function (result) {
             console.log(result);
             //Hide spin window
             $scope.showSpin = false;
             //After adding course redirect to course management page
             resetForm();
         }, function (error) {
             alert(error);
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
             populatePeriodList(result);
         }, function (error) {
             console.log(error);
         });
     }

     //used for initializing the controller
     var init = function () {
         //#region initialize scope variables
         $scope.actionType = $routeParams.actionType;
         $scope.confirmWindowOption = {
             actionType: null,
             showConfirm: false
         };
         //#endregion
         getAllPeriods();
     } ();

 } ]); 