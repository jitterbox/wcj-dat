/** Controller descriptions
Is used to provide all event handling logic for course view i.e course.html
*/
'use strict';
fsdtsApp.controller('courseController', ['$scope', '$routeParams', 'appConstants', 'courseManagementService', '$location', 'userProfileService',
function ($scope, $routeParams, appConstants, courseManagementService, $location, userProfileService) {

    //Submit button click handler
    $scope.onSubmit = function (event) {
        event.preventDefault();
        if ($scope.validator.validate()) {  //code for validation
            $scope.validationClass = "valid";
            if ($routeParams.actionType === appConstants.OPERATION_TYPE.ADD) {
                showConfirmWindow();
            } else if ($routeParams.actionType === appConstants.OPERATION_TYPE.EDIT) {
                if (isDirtyForm($scope.courseInfo)) {//Check dirty form
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
            if ($routeParams.actionType === appConstants.OPERATION_TYPE.ADD) { //Add course
                addCourse();
            } else {//Edit course
                editCourse();
            }
        } else if ((actionType === 'Cancel') && (isConfirmed === true)) { //code for cancel
            resetForm();
        }
    };

    //Check dirty form
    var isDirtyForm = function (courseInfo) {
        return !angular.equals(courseInfo, masterCourseInfo);
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
        $scope.courseInfo = {
            'status': appConstants.STATUS.ACTIVE
        };
        $location.path('/courseManagement');
    };

    //Service call to add course
    var addCourse = function () {
        //Show spin window
        $scope.showSpin = true;
        courseManagementService.addCourse($scope.courseInfo).then(function () {
            //Hide spin window
            $scope.showSpin = false;
            //After adding course redirect to course management page
            $location.path('/courseManagement');
        }, function (error) {
            showErrorWindow(error);
        });
    };

    //Service call to edit course
    var editCourse = function () {
        //Show spin window
        $scope.showSpin = true;
        courseManagementService.editCourse($scope.courseInfo).then(function () {
            //Show spin window
            $scope.showSpin = false;
            //After updating course redirect to course management page
            $location.path('/courseManagement');
        }, function (error) {
            showErrorWindow(error);
        });
    };

    var masterCourseInfo;
    //Service call to get course details
    var getCourse = function () {
        //Show spin window
        $scope.showSpin = true;
        courseManagementService.getCourseDetails(userProfileService.profile.params.courseId).then(function (result) {
            $scope.courseInfo = courseManagementService.populateCourseModel(result);
            masterCourseInfo = angular.copy($scope.courseInfo);
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
            $scope.courseInfo = {
                'status': appConstants.STATUS.ACTIVE
            };

        } else { //Getting the course details if its a edit operation
            getCourse();
        }
    })();
}
]);