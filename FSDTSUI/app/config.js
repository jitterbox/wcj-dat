/**  Config descriptions
 *Used to provide applicaton level constant & variables
*/
//TODO: Optimization : Going to remove unnecessary constants and variables
//#region Application level constant
'use strict';
fsdtsApp.constant('appConstants', {
    'API_END_POINTS': {
        'ADD_COURSE': 'http://192.168.15.32/api/course',
        'EDIT_COURSE': 'http://192.168.15.32/api/course/',
        'GET_COURSE': 'http://192.168.15.32/api/course/',
        'ADD_PROGRAM': 'http://192.168.15.32/api/Program',
        'EDIT_PROGRAM': 'http://192.168.15.32/api/Program/',
        'GET_PROGRAM': 'http://192.168.15.32/api/Program/',
        'ADD_CREDENTIAL': 'http://192.168.15.32/api/Credential',
        'EDIT_CREDENTIAL': 'http://192.168.15.32/api/Credential/',
        'GET_CREDENTIAL': 'http://192.168.15.32/api/Credential/',
        'ADD_ORGANIZATION': 'http://192.168.15.32/api/Organization',
        'EDIT_ORGANIZATION': 'http://192.168.15.32/api/Organization/',
        'GET_ORGANIZATION': 'http://192.168.15.32/api/Organization/',
        'ADD_PROJECT': 'http://192.168.15.32/api/Project',
        'EDIT_PROJECT': 'http://192.168.15.32/api/Project/',
        'GET_PROJECT': 'http://192.168.15.32/api/Project/',
        'ADD_PERIOD': 'http://192.168.15.32/api/Period/',
        'GET_PERIOD': 'http://192.168.15.32/api/Period/',
        'DELETE_PERIOD': 'http://192.168.15.32/api/Period/',
        'ADD_USER': 'http://192.168.15.32/api/User/',
        'EDIT_USER': 'http://192.168.15.32/api/User/',
        'GET_USER': 'http://192.168.15.32/api/User/',
        'PARTICIPANT': 'http://192.168.15.32/api/ProjectOrganization'

         //External end point
        //'ADD_COURSE': 'http://203.197.80.136/api/course',
        //'EDIT_COURSE': 'http://203.197.80.136/api/course/',
        //'GET_COURSE': 'http://203.197.80.136/api/course/',
        //'ADD_PROGRAM': 'http://203.197.80.136/api/Program',
        //'EDIT_PROGRAM': 'http://203.197.80.136/api/Program/',
        //'GET_PROGRAM': 'http://203.197.80.136/api/Program/',
        //'ADD_CREDENTIAL': 'http://203.197.80.136/api/Credential',
        //'EDIT_CREDENTIAL': 'http://203.197.80.136/api/Credential/',
        //'GET_CREDENTIAL': 'http://203.197.80.136/api/Credential/',
        //'ADD_ORGANIZATION': 'http://203.197.80.136/api/Organization',
        //'EDIT_ORGANIZATION': 'http://203.197.80.136/api/Organization/',
        //'GET_ORGANIZATION': 'http://203.197.80.136/api/Organization/',
        //'ADD_PROJECT': 'http://203.197.80.136/api/Project',
        //'EDIT_PROJECT': 'http://203.197.80.136/api/Project/',
        //'GET_PROJECT': 'http://203.197.80.136/api/Project/'
        
    },
    'OPERATION_TYPE': {
        'ADD': '1',
        'EDIT': '2'
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
    'COMMON_PROGRAMS': [
        'Common Program1',
        'Common Program2',
        'Common Program3'
    ],
    'COMMON_FORMATS': [
        'Certifications',
        'Courses',
        'Programs'
    ]
 
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