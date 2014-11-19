/** Controller descriptions
Is used to provide all event handling logic for course management view i.e courseManagement.html;
*/
'use strict';

fsdtsApp.controller('participantManagementController', ['$scope', 'appConstants', 'courseManagementService', '$location', 'userProfileService', 'participantManagementService',
function ($scope, appConstants, courseManagementService, $location, userProfileService, participantManagementService) {

  //TODO: Optimization : Dummy implementation need to be removed
  
    $scope.organizationDDLList = [];
    $scope.trackingItemDDLList = [];
    $scope.participantInfo = {};
    $scope.isEmptyProjectOrganization = false;

    //Submit button click handler
    $scope.onSubmit = function (event) {
            $scope.confirmWindowOption.actionType = "Submit";
            $scope.confirmWindowOption.showConfirm = true;
        
    };

    //call back handler for confirmation window
    $scope.confirmActionHandler = function (actionType, isConfirmed) {
        if ((actionType === 'Submit') && (isConfirmed === true)) {
                addToProject();
        }

    };

    $scope.onOrganizationSelect = function () {
        console.log($scope.participantInfo.selectedOrganization);
        resetDependentDDL();
    };

    $scope.onFormatSelect = function (selectedFormat) {
        console.log(selectedFormat);
        loadTrackingItemDDL(selectedFormat);
    };

    $scope.onDelete = function (selectedRow) {
        console.log(selectedRow);
    };

    var resetDependentDDL = function () {
        $scope.participantInfo.format = null;
        $scope.trackingItemDDLList = [];
        $scope.participantInfo.selectedTrackingItem = null;
    };

    var addToProject = function () {
        //Show spin window
        $scope.showSpin = true;
        participantManagementService.addToProject($scope.participantInfo).then(function () {
            //Hide spin window
            $scope.showSpin = false;
            //Refresh the grid
            loadParticipantList();
        }, function (error) {
            console.log(error);
        });

    };

    var loadTrackingItemDDL = function (selectedFormat) {
        $scope.trackingItemDDLList = participantManagementService.papulateTrackingItemDDL(selectedFormat, $scope.participantInfo.selectedOrganization);
       
    };

    var loadOrganizationDDL = function () {
        participantManagementService.papulateOrganizationDDL().then(function (result) {
            $scope.organizationDDLList = result;
            $scope.participantInfo.selectedOrganization = $scope.organizationDDLList[0];
            }, function (error) {
                console.log(error);
            });
    };
   
    var loadParticipantList = function () {
        //Show spin window
        $scope.showSpin = true;
        participantManagementService.getParticipantList().then(function (result) {
            //Hide spin window
            $scope.showSpin = false;
            $scope.projectOrganizationList = result;
            $scope.isEmptyProjectOrganization = isEmptyDict($scope.projectOrganizationList);
            //console.log(test);
        }, function (error) {
            console.log(error);
        });
    };

    //Used for initializing the controller
    var init = function () {
        //#region initialize scope variables
        $scope.confirmWindowOption = {
            actionType: null,
            showConfirm: false
        };
        //#endregion
        loadOrganizationDDL();
        loadParticipantList();
    }();

}
]);