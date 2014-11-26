/**  app.js descriptions
*Used to provide routing and all application level support for the project
*
*/

'use strict';
//Define module for application
var fsdtsApp = angular.module('fsdtsApp', ['ngRoute', 'ngCookies', 'ngGrid', 'kendo.directives']);
//Define Routing for app
//TODO: Optimization : Going to optimize the routing code depending upon the authentication and authorization model .(Discussion is pending)
fsdtsApp.config(['$routeProvider', '$locationProvider', 'appConstants',
function ($routeProvider, $locationProvider, appConstants) {
    //$locationProvider.html5Mode(true);
    $routeProvider.
    when('/login', {
        templateUrl: 'app/views/common/login.html',
        controller: 'authController',
        activePage: 'loginPage',
        label: 'login'
    }).
    when('/course/:actionType', {
        templateUrl: 'app/views/adminSite/course.html',
        controller: 'courseController',
        data: {
            breadcrumb: {
                label: 'Course'
            },
            authorizedRoles: []
        }
    }).
    when('/credential/:actionType', {
        templateUrl: 'app/views/adminSite/credential.html',
        controller: 'credentialController',
        data: {
            breadcrumb: {
                label: 'Credential'
            },
            authorizedRoles: []
        }
    }).
    when('/program/:actionType', {
        templateUrl: 'app/views/adminSite/program.html',
        controller: 'programController',
        data: {
            breadcrumb: {
                label: 'Program'
            },
            authorizedRoles: [appConstants.USER_ROLES.ADMIN, appConstants.USER_ROLES.USER]
        }
    }).
    when('/organization/:actionType', {
        templateUrl: 'app/views/adminSite/organization.html',
        controller: 'organizationController',
        data: {
            breadcrumb: {
                label: 'Organization'
            },
            authorizedRoles: []
        }
    }).
    when('/courseManagement', {
        templateUrl: 'app/views/adminSite/courseManagement.html',
        controller: 'courseManagementController',
        data: {
            breadcrumb: {
                label: 'Courses'
            },
            authorizedRoles: [appConstants.USER_ROLES.ADMIN, appConstants.USER_ROLES.USER]
        }
    }).
    when('/credentialManagement', {
        templateUrl: 'app/views/adminSite/credentialManagement.html',
        controller: 'credentialManagementController',
        data: {
            breadcrumb: {
                label: 'Credentials'
            },
            authorizedRoles: []
        }
    }).
    when('/programManagement', {
        templateUrl: 'app/views/adminSite/programManagement.html',
        controller: 'programManagementController',
        data: {
            breadcrumb: {
                label: 'Programs'
            },
            authorizedRoles: [appConstants.USER_ROLES.ADMIN, appConstants.USER_ROLES.USER]
        }
    }).
    when('/organizationManagement', {
        templateUrl: 'app/views/adminSite/organizationManagement.html',
        controller: 'organizationManagementController',
        data: {
            breadcrumb: {
                menuType: 'parent',
                label: 'Organizations'
            },
            authorizedRoles: [appConstants.USER_ROLES.ADMIN, appConstants.USER_ROLES.USER]
        }
    }).
    when('/userManagement/:userType', {
        templateUrl: 'app/views/adminSite/userManagement.html',
        controller: 'userManagementController',
        data: {
            breadcrumb: {
              //  menuType: 'parent',
                label: 'Users'
            },
            authorizedRoles: [appConstants.USER_ROLES.ADMIN, appConstants.USER_ROLES.USER]
        }
    }).
    when('/projectManagement', {
        templateUrl: 'app/views/adminSite/projectManagement.html',
        controller: 'projectManagementController',
        data: {
            breadcrumb: {
                menuType: 'parent',
                label: 'Projects'
            },
            authorizedRoles: [appConstants.USER_ROLES.ADMIN, appConstants.USER_ROLES.USER]
        }
    }).
    when('/user/:actionType', {
        templateUrl: 'app/views/adminSite/user.html',
        controller: 'userController',
        data: {
            breadcrumb: {
                label: 'User'
            },
            authorizedRoles: []
        }
    }).
    when('/project/:actionType', {
        templateUrl: 'app/views/adminSite/project.html',
        controller: 'projectController',
        data: {
            breadcrumb: {
                label: 'Project'
            },
            authorizedRoles: [appConstants.USER_ROLES.ADMIN, appConstants.USER_ROLES.USER]
        }
    }).
    when('/periodManagement', {
        templateUrl: 'app/views/adminSite/periodManagement.html',
        controller: 'periodManagementController',
        activePage: 'Period Management',
        label: 'Period Management',
        data: {
            breadcrumb: {
                label: 'Reporting Periods'
            },
            authorizedRoles: []
        }
    }).
    when('/participantManagement', {
        templateUrl: 'app/views/adminSite/participantManagement.html',
        controller: 'participantManagementController',
        data: {
            breadcrumb: {
                label: 'Participants'
            },
            authorizedRoles: []
        }
    }).
    when('/measureManagement', {
        templateUrl: 'app/views/adminSite/measureManagement.html',
        //controller: 'measureManagementController',
        activePage: 'Measure Management',
        label: 'Measure Management',
        data: {
            authorizedRoles: []
        }
    }).
    when('/reportManagement', {
        templateUrl: 'app/views/adminSite/reportManagement.html',
        //controller: 'reportManagementController',
        activePage: 'Report Management',
        label: 'Report Management',
        data: {
            authorizedRoles: []
        }
    }).
    when('/measure/:actionType', {
        templateUrl: 'app/views/adminSite/measure.html',
        //controller: 'measureController',
        activePage: 'Measure',
        label: 'Measure',
        data: {
            authorizedRoles: []
        }
    }).
    when('/maintenanceManagement', {
        templateUrl: 'app/views/adminSite/maintenanceManagement.html',
        controller: 'maintenanceManagementController',
        activePage: 'maintenance Management',
        label: 'maintenance Management',
        data: {
            breadcrumb: {
                menuType: 'parent',
                label: 'Maintenance'
            },
            authorizedRoles: []
        }
    }).
    when('/adminUser/:userType', {
        templateUrl: 'app/views/adminSite/userManagement.html',
        controller: 'userManagementController',
        data: {
            breadcrumb: {
                menuType: 'parent',
                label: 'Users'
            },
            authorizedRoles: [appConstants.USER_ROLES.ADMIN, appConstants.USER_ROLES.USER]
        }
    }).
   when('/aboutUs', {
       templateUrl: 'app/views/common/aboutUs.html',
       activePage: 'AboutUs',
       label: 'AboutUs'
   }).when('/aboutIndustry', {
       templateUrl: 'app/views/common/aboutIndustry.html',
       activePage: 'About Industry',
       label: 'About Industry'
   }).when('/welcome', {
       templateUrl: 'app/views/common/welcome.html',
       activePage: 'Welcome',
       label: 'Welcome',
       data: {
           authorizedRoles: []
       }
   }).
    otherwise({
        redirectTo: '/welcome'
    });

}
]);

//Restrict unauthorized user to access restricted page directly
//TODO: Need to be optimized depending upon the authentication and authorization model .(Discussion is pending)
fsdtsApp.run(function ($rootScope, $location, userProfileService) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        var authorizedRoles;
        //Getting page restriction details
        if (next.data) {
            authorizedRoles = next.data.authorizedRoles;
        }
        if (authorizedRoles && authorizedRoles.length > 0) { //If its a restricted page
            if (userProfileService.profile.loggedIn === true) { //User is loggedIn or not
                //Checking whether user have permission to access the page or not 
                if (authorizedRoles.indexOf(userProfileService.profile.credentials.userType) < 0) {
                    $location.path('/login');
                }

            } else {
                $location.path('/login');
            }
        }

        //if (authorizedRoles && authorizedRoles.length > 0) { //If its a restricted page
        //    if ($rootScope.userProfile.loggedIn === true) { //User is loggedIn or not
        //        //Checking whether user have permission to access the page or not 
        //        if (authorizedRoles.indexOf($rootScope.userProfile.credentials.userType) < 0) {
        //            $location.path('/login');
        //        }

        //    } else {
        //        $location.path('/login');
        //    }
        //}

    });
});
