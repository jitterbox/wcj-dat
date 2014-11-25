/**  Config descriptions
 *Used to provide applicaton level constant & variables
*/
//TODO: Optimization : Going to remove unnecessary constants and variables
//#region Application level constant
'use strict';
fsdtsApp.constant('appConstants', {
    'API_END_POINTS': {

        'COURSE': 'http://192.168.15.90:8090/api/course/',
        'PROGRAM': 'http://192.168.15.90:8090/api/Program/',
        'CREDENTIAL': 'http://192.168.15.90:8090/api/Credential/',
        'ORGANIZATION': 'http://192.168.15.90:8090/api/Organization/',
        'PROJECT': 'http://192.168.15.90:8090/api/Project/',
        'PERIOD': 'http://192.168.15.90:8090/api/Period/',
        'USER': 'http://192.168.15.90:8090/api/User/',
        'ADMIN_USER': 'http://192.168.15.90:8090/api/User/',
        'GET_USER': 'http://192.168.15.90:8090/api/GetUserInfoById',
        'PARTICIPANT': 'http://192.168.15.90:8090/api/ProjectOrganization/',
        'MAINTAINANCE': 'http://192.168.15.90:8090/api/CommonProgramsGrouping/'

//        'COURSE': 'http://203.197.80.136/api/course/',
//        'PROGRAM': 'http://203.197.80.136/api/Program/',
//        'CREDENTIAL': 'http://203.197.80.136/api/Credential/',
//        'ORGANIZATION': 'http://203.197.80.136/api/Organization/',
//        'PROJECT': 'http://203.197.80.136/api/Project/',
//        'PERIOD': 'http://203.197.80.136/api/Period/',
//        'USER': 'http://203.197.80.136/api/User/',
//        'ADMIN_USER': 'http://203.197.80.136/api/User/',
//        'GET_USER': 'http://203.197.80.136/api/GetUserInfoById',
//        'PARTICIPANT': 'http://203.197.80.136/api/ProjectOrganization/',
//        'MAINTAINANCE': 'http://203.197.80.136/api/CommonProgramsGrouping/'

        //External end point
        //'COURSE': 'http://203.197.80.136/api/course/',
        //'PROGRAM': 'http://203.197.80.136/api/Program/',
        //'CREDENTIAL': 'http://203.197.80.136/api/Credential/',
        //'ORGANIZATION': 'http://203.197.80.136/api/Organization/',
        //'PROJECT': 'http://203.197.80.136/api/Project/',
        //'PERIOD': 'http://203.197.80.136/api/Period/',
        //'USER': 'http://203.197.80.136/api/User/',
        //'PARTICIPANT': 'http://203.197.80.136/api/ProjectOrganization/'

    },
    'OPERATION_TYPE': {
        'ADD': '1',
        'EDIT': '2',
        'DELETE': '3'
    },
    'USER_ROLES': {
        'ALL': '*',
        'ADMIN': 'ADMIN',
        'USER': 'USER',
        'GUEST': 'GUEST'
    },
    'STATUS': {
        'ACTIVE': 'Active',
        'INACTIVE': 'Inactive'
    },
   'USER_TYPE': {
    'ADMINUSER':'ADMIN',
    'ORGUSER':'ORGUSER'
   },
    'COMMON_FORMATS': [
        'Certifications',
        'Courses',
        'Programs'
    ],
    'EVENT_TYPE': {
        'USERPROFILE_CHANGE': 'userProfileChange',
    },

});
//#endregion
//#region Application level variables
fsdtsApp.run(function ($rootScope, userProfileService, $cookieStore) {

    var userProfile = $cookieStore.get('userProfile');
    if (userProfile) { //If user is already logedin
        $rootScope.userProfile = userProfile;
    } else {
        $rootScope.userProfile = userProfileService.profile;
    }
});
//#endregion