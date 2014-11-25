/** Controller descriptions
 AppLevel controller i.e. something that is accessible from every page
*/
'use strict';
fsdtsApp.controller('appController', ['$scope', '$rootScope', 'appConstants', '$cookieStore', 'userProfileService', '$location', '$route', '$timeout','$window',
    function ($scope, $rootScope, appConstants, $cookieStore, userProfileService, $location, $route, $timeout, $window) {
        //#region App level variables initialization
        $scope.USER_ROLES = appConstants.USER_ROLES;
        $scope.OPERATION_TYPE = appConstants.OPERATION_TYPE;
        $scope.COMMON_PROGRAMS = appConstants.COMMON_PROGRAMS;
        $scope.COMMON_FORMATS = appConstants.COMMON_FORMATS;
        $scope.USER_TYPE = appConstants.USER_TYPE;
        $scope.userProfileRefresh = true;
        //#endregion
        var userProfileChange;
        //#region App level main menu initialization
        $scope.mainMenuActions = [{
            name: "Users",
            href: "#adminUser/ADMIN",
            authorizedRoles: []
        }, {
            name: "Projects",
            href: "#projectManagement",
            authorizedRoles: ['READ_ONLY', 'ADMIN']
        }, {
            name: "Organizations",
            href: "#organizationManagement",
            authorizedRoles: ['READ_ONLY', 'ADMIN']
        }, {
            name: "Maintenance",
            href: "#maintenanceManagement",
            authorizedRoles: ['ADMIN']
        }];

        var isAllowed = function (mainMenuActions,actionType) {
            //if (mainMenuActions.authorizedRoles && mainMenuActions.authorizedRoles.length) {
            //    for (var i = 0; i < mainMenuActions.authorizedRoles.length; ++i) {
            //        //if (authorizedRoles.indexOf($rootScope.userProfile.credentials.userType) < 0) {
            //        //    $location.path('/login');
            //        //}
            //        if (jQuery.inArray(mainMenuActions.authorizedRoles[i], UserService.roles) >= 0) {
            //            return true;
            //        }
            //    }
            //    return false;
            //} else {
            //    return !(UserService.roles && UserService.roles.length);
            //}

            return true;
        };
        
        var initMainMenuActions = function () {
            for (var i = 0; i < $scope.mainMenuActions.length; ++i) {
                var action = $scope.mainMenuActions[i];
                if (isAllowed(action)) {
                    action.isRendered = true;
                } else {
                    action.isRendered = false;
                }
            }
        };

        userProfileChange = $scope.$on(appConstants.EVENT_TYPE.USERPROFILE_CHANGE, function (event, userProfileObj) {
            if (userProfileObj.loggedIn === true) { //loggedin user
            } else {
            }
            initMainMenuActions();
           // console.log(data);
        });
        //#endregion

        //#region Breadcrumbs functionality //TODO: Optimization : Optimization required
        $scope.breadcrumbs = [];
        $rootScope.$on('$routeChangeSuccess', function (event, next, current) {
            try {
                if (next.$$route.data && next.$$route.data.breadcrumb) {
                    if (next.$$route.data.breadcrumb.menuType !== 'parent') {
                        var label;
                        if (next.params && next.params.actionType === $scope.OPERATION_TYPE.ADD) {
                            label = 'Add New';
                        } else if (next.params && next.params.actionType === $scope.OPERATION_TYPE.EDIT) {
                            label = 'Edit';
                        } else {
                            label = next.$$route.data.breadcrumb.label;
                        }
                        $scope.breadcrumbs.push({ 'label': label, 'path': $location.path(), 'param': null });
                        if ($scope.breadcrumbs.length > 0) {
                            $scope.breadcrumbs = $scope.filterDuplicateBreadcrumb(next.$$route.data.breadcrumb.label);
                        }

                    }
                    else {
                        $scope.breadcrumbs = [];
                        $scope.breadcrumbs.push({ 'label': next.$$route.data.breadcrumb.label, 'path': $location.path(), 'param': null });
                    }
                } else {
                    $scope.breadcrumbs = [];
                }
            }
            catch (err) {
            }
            // console.log('$location.path()', $location.path());
            //BreadcrumbService.generateBreadcrumbs();
            // var routes = $route.routes;
            //var pathElements = $location.path().split('/');
        });
        $scope.filterDuplicateBreadcrumb = function (label) {
            var breadcrumbs = [];
            for (var i = 0; i < $scope.breadcrumbs.length; i++) {
                breadcrumbs.push($scope.breadcrumbs[i]);
                if ($scope.breadcrumbs[i].label === label) {
                    break;
                }
            }
            return breadcrumbs;
        };
        //#endregion

        //$window.onbeforeunload = function (event) {
        //     var userProfile=userProfileService.resetUserProfile();
        //   // $rootScope.$broadcast(appConstants.EVENT_TYPE.USERPROFILE_CHANGE, userProfile);
        //    //return "All data that you have entered will be lost!Omm";
        //}

        //Remov all application level variables & handlers here
        $scope.$on("$destroy", function () {
            $cookieStore.remove('userProfile');
            //alert('destory app');
            //Remove the evant handler
            // userProfileChange();
           // delete $window.onbeforeunload;
        });

    }
]);