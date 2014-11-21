/**  Config descriptions
 *Used to provide applicaton level constant & variables
*/
//TODO: Optimization : Going to remove unnecessary constants and variables
//#region Application level constant
'use strict';
fsdtsApp.constant('appConstants', {
    'API_END_POINTS': {

        'COURSE': 'http://192.168.15.32/api/course/',
        'PROGRAM': 'http://192.168.15.32/api/Program/',
        'CREDENTIAL': 'http://192.168.15.32/api/Credential/',
        'ORGANIZATION': 'http://192.168.15.32/api/Organization/',
        'PROJECT': 'http://192.168.15.32/api/Project/',
        'PERIOD': 'http://192.168.15.32/api/Period/',
        'USER': 'http://192.168.15.32/api/User/',
        'PARTICIPANT': 'http://192.168.15.32/api/ProjectOrganization/'
       
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
        'DELETE':'3'
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