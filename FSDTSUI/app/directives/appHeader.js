/** Directive descriptions
*Used to provide common header implementation for the application
*Can be used as a element as follows ,
    <app-header></app-header>
*
*/
'use strict';
fsdtsApp.directive('appHeader', ['appConstants', '$location','userProfileService',
    function (appConstants, $location, $cookieStore, userProfileService) {
        return {
            restrict: 'E',
            /*jshint multistr: true */
            template: ' <div class="container">\
                <div class="row">\
                    <div class="col-md-8">\
                        <div class="panel-default">\
                            <a href="#welcome">\
                                <img alt="" title="west Central Jobs" src="styles/images/ohpenn.png" style="width:16%;">\
                            </a>\
                            <h1>Data Tracking System</h1>\
                            <h2 ng-if="userProfile.credentials.userType === USER_ROLES.ADMIN">- Administration</h2>\
                        </div>\
                    </div>\
                    <div class="col-md-4">\
                        <div class="panel-default">\
                            <!--START header section for anonymous user-->\
                            <div class="logout">\
                                <ul>\
                                    <li><a href="#aboutIndustry">About Industry</a></li>\
                                    <li><a href="#aboutUs">About Us</a></li>\
                                    <li ng-if="!userProfile.loggedIn" class="ng-scope"><a href="#/login">Login</a></li>\
                                    <li ng-if="userProfile.loggedIn" class="ng-scope"><a href="" ng-click=onLogout()>Logout</a></li>\
                                </ul>\
                            </div>\
                        <!--END header section for anonymous user-->\
                        </div>\
                    </div>\
                </div>\
                <div class="row">\
                    <div class="col-md-1"></div>\
                    <div class="col-md-11">\
                        <div>\
                            <!--START header section for admin-->\
                            <div ng-if="userProfile.loggedIn === true" class="x-navigation ng-scope">\
                                <ul>\
                                    <span ng-repeat="action in mainMenuActions" ng-switch on="action.isRendered">\
                                      <li ng-switch-when="true"><a href="{{action.href}}">{{action.name}}</a></li>\
                                    </span>\
                                </ul>\
                            </div>\
                            <!--\
                            <div ng-if="userProfile.credentials.userType === USER_ROLES.ADMIN" class="x-navigation ng-scope">\
                                <ul>\
                                    <li><a href="#adminUser/ADMIN">Users</a></li>\
                                    <li><a href="#projectManagement">Projects</a></li>\
                                    <li><a href="#organizationManagement">Organizations</a></li>\
                                    <li><a href="#maintenanceManagement">Maintenance</a></li>\
                                </ul>\
                            </div>-->\
                            <!--END header section for admin-->\
                            <!--START header section for user-->\
                            <div ng-if="userProfile.credentials.userType === USER_ROLES.USER" class="x-navigation ng-scope">\
                                <ul>\
                                    <li><a href="#userManagement">Users</a></li>\
                                </ul>\
                            </div>\
                            <!--END header section for user-->\
                        </div>\
                    </div>\
                </div>\
                 <!--START breadcrumbs section-->\
                <div class="col-md-12" ng-if="userProfile.loggedIn === true">\
                    <breadcrumb></breadcrumb>\
                </div>\
                <!--END breadcrumbs section -->\
            </div>',
            link: function ($scope, elem, attr, ctrl) {
                //console.log($scope); 
            },
            controller: function ($scope,$rootScope, $element, $attrs, $cookieStore, userProfileService) {
                //Logout handler
                $scope.onLogout = function () {
                    $scope.userProfile = userProfileService.resetUserProfile();
                    $rootScope.$broadcast(appConstants.EVENT_TYPE.USERPROFILE_CHANGE, $scope.userProfile);
                    $location.path('/login');
                };

                //used for initializing the header
                var init = (function () {
                    $scope.userProfile = userProfileService.getUserProfile();
                })();
            }

        };
    }
]);