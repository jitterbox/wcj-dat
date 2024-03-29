﻿/**  Config descriptions
 *Used to provide applicaton level constant & variables
*/
//TODO: Optimization : Going to remove unnecessary constants and variables
//#region Application level constant
'use strict';
fsdtsApp.constant('appConstants', {
    'API_END_POINTS': {

        'COURSE': 'http://203.197.80.136/api/course/',
        'PROGRAM': 'http://203.197.80.136/api/Program/',
        'CREDENTIAL': 'http://203.197.80.136/api/Credential/',
        'ORGANIZATION': 'http://203.197.80.136/api/Organization/',
        'PROJECT': 'http://203.197.80.136/api/Project/',
        'PERIOD': 'http://203.197.80.136/api/Period/',
        'USER': 'http://203.197.80.136/api/User/',
        'ADMIN_USER': 'http://203.197.80.136/api/GetUserInfoByUserType',
        'GET_USER': 'http://203.197.80.136/api/GetUserInfoById',
        'LOGIN_USER': 'http://203.197.80.136/api/Login',
        'PARTICIPANT': 'http://203.197.80.136/api/ProjectOrganization/',
        'MAINTENANCE': 'http://203.197.80.136/api/CommonProgramsGrouping/',
        'FORGOTPASSWORD': 'http://203.197.80.136/api/ForgotPassword',
        'RESETPASSWORD': 'http://203.197.80.136/api/ResetPassword'

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
        //        'MAINTENANCE': 'http://203.197.80.136/api/CommonProgramsGrouping/'

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
        'DELETE': '3',
        'LOGIN': 4,
        'FORGOTPASSWORD': 5,
        'RESETPASSWORD': 6
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
        'ADMINUSER': 'ADMIN',
        'ORGUSER': 'ORGUSER'
    },
    'COMMON_FORMATS': [
        'Certifications',
        'Courses',
        'Programs'
    ],
    'EVENT_TYPE': {
        'USERPROFILE_CHANGE': 'userProfileChange',
    },
    'GRID_PAGING_OPTION': {
        'pageSizes': [10, 15, 20],
        'pageSize': 10,
        'currentPage': 1,
        'enablePaging': false
    },
    'YEAR': {
        'startYear': new Date().getFullYear() - 5,
        'endYear': new Date().getFullYear() + 10
    },
    'ERROR_MESSAGES': {
        'FORGOTPASSWORD': {
            'SUCCESS': 'Please check your inbox , we\'ve sent you reset password url.',
            'FAILURE': 'Invalid email id or first name.',
            'INVALIDCAPTCHA': 'Invalid captcha.',
            'INVALIDURL': 'Invalid url.Please regenerate url using forgot password'
        },
        'RESETPASSWORD': {
            'FAILURE': 'Reset password fail.',
            'SUCCESS': 'Your password has been reset successfully.',
        }
    }
});
//#endregion
//#region Application level variables
fsdtsApp.run(function ($rootScope, userProfileService, $cookieStore) {

    //var userProfile = $cookieStore.get('userProfile');
    //if (userProfile) { //If user is already logedin
    //    $rootScope.userProfile = userProfile;
    //} else {
    //    $rootScope.userProfile = userProfileService.profile;
    //}
});
//#endregion