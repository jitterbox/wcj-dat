/** Controller descriptions
 AppLevel controller i.e. something that is accessible from every page
*/
'use strict';
fsdtsApp.controller('appController', ['$scope', '$rootScope', 'appConstants', '$cookieStore', 'userProfileService', '$location', '$route', '$timeout',
    function ($scope, $rootScope, appConstants, $cookieStore, userProfileService, $location, $route, $timeout) {
        //#region App level variables initialization
        $scope.USER_ROLES = appConstants.USER_ROLES;
        $scope.OPERATION_TYPE = appConstants.OPERATION_TYPE;
        $scope.COMMON_PROGRAMS = appConstants.COMMON_PROGRAMS;
        $scope.COMMON_FORMATS = appConstants.COMMON_FORMATS;
        $scope.userProfileRefresh = true;
        //#endregion

        //#region Breadcrumbs functionality //TODO: Optimization : Optimization required
        $scope.breadcrumbs = [];
        $rootScope.$on('$routeChangeSuccess', function (event, next, current) {
            try {
                if (next.$$route.data && next.$$route.data.breadcrumb) {
                    if (next.$$route.data.breadcrumb.menuType !== 'parent') {
                        var label;
                        if (next.params && next.params.actionType === $scope.OPERATION_TYPE.ADD) {
                            label='Add New';
                        } else if (next.params && next.params.actionType === $scope.OPERATION_TYPE.EDIT) {
                            label = 'Edit';
                        } else {
                            label=next.$$route.data.breadcrumb.label;
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
            for (var i = 0 ; i < $scope.breadcrumbs.length; i++) {
                breadcrumbs.push($scope.breadcrumbs[i]);
                if ($scope.breadcrumbs[i].label === label) {
                    break;
                } 
            }
            return breadcrumbs;
        };
        //#endregion

        //Remov all application level variables & handlers here
        $scope.$on("$destroy", function () {
            $cookieStore.remove('userProfile');
        });

    }
]);