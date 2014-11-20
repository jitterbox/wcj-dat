/** Controller descriptions
Is used to provide all event handling logic for program view i.e program.html

*/
'use strict';
fsdtsApp.controller('projectController', ['$scope', 'appConstants', '$routeParams', 'projectManagementService', '$location', 'userProfileService',
function ($scope, appConstants, $routeParams, projectManagementService, $location, userProfileService) {

    //Submit button click handler
    $scope.onSubmit = function (event) {
        event.preventDefault();
        if ($scope.validator.validate() && customVlaidate()) {  //code for validation
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
            if ($routeParams.actionType === appConstants.OPERATION_TYPE.ADD) { //Add Project
                addProject();
            } else {//Edit Project
                editProject();
            }
        } else if ((actionType === 'Cancel') && (isConfirmed === true)) { //code for cancel
            resetForm();
        }
    };

    //custom validator for start year and end year
    $scope.isValidYear = true;
    $scope.validateYear = function (startYear, endYear) {
        //compare with end year
        if (startYear > endYear) {
            $scope.isValidYear = false;
        } else {
            $scope.isValidYear = true;
        }

    };

    //Showing error window
    var showErrorWindow = function (errorMessage) {
        $scope.errorWindowOption.showError = true;
        $scope.errorWindowOption.errorMessage = errorMessage;
        $scope.showSpin = false;
    };

    //custom validation logic goes here
    var customVlaidate = function () {
        return $scope.isValidYear;
    }

    //Reset the form control
    var resetForm = function () {
        $scope.projectInfo = {
            'status': appConstants.STATUS.ACTIVE
        };
        $location.path('/projectManagement');
    };

    //Service call to add project
    var addProject = function () {
        //Show spin window
        $scope.showSpin = true;
        projectManagementService.addProject($scope.projectInfo).then(function () {
            //Hide spin window
            $scope.showSpin = false;
            //After adding course redirect to course management page
            $location.path('/projectManagement');
        }, function (error) {
            showErrorWindow(error);

        });
    };

    //Service call to edit project
    var editProject = function () {
        //Show spin window
        $scope.showSpin = true;
        projectManagementService.editProject($scope.projectInfo).then(function () {
            //Hide spin window
            $scope.showSpin = false;
            //After updating course redirect to course management page
            $location.path('/projectManagement');
        }, function (error) {
            showErrorWindow(error);

        });
    };

    //Service call to get course details
    var getProject = function () {
        //Show spin window
        $scope.showSpin = true;
        projectManagementService.getProjectDetails(userProfileService.profile.params.projectId).then(function (result) {
            $scope.projectInfo = projectManagementService.populateProjectModel(result);
            //Hide spin window
            $scope.showSpin = false;
        }, function (error) {
            showErrorWindow(error);
        });
    };

    //Return year list from current year to current year+10 
    var getYearList = function () {
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var yearList = [];
        for (var i = 0; i < 10; i++) {
            yearList.push((currentYear + i).toString());
        }
        return yearList;
    };

    //Used for initializing the controller
    var init = (function () {
        //#region initialize scope variables
        $scope.yearList = getYearList();
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
            $scope.projectInfo = {
                'status': appConstants.STATUS.ACTIVE,
                'startYear': new Date().getFullYear().toString(),
                'endYear': new Date().getFullYear().toString()
            };

        } else { //Getting the course details if its a edit operation
            getProject();
        }
    })();

}
]);