/**  Service descriptions
 *Used to 
    1)contain loged in user profile 
    2)sharing state and data of user among different views 
 *Expose method :
    getUserProfile
*/

//TODO: Putting actual implementation : Dummy code need to be removed & implementation need to be done as per authentication and authorization mechanism
'use strict';
fsdtsApp.factory('userProfileService', ['$http',
    function ($http) {
        var serviceInstance = {};
        //Profile object used to contain role based profile details
        serviceInstance.profile = {};
        //TODO : Dummy user profile & needs to be initalized from authService
        serviceInstance.profile = {
            'status': '',
            'loggedIn': false,
            'credentials': {
                'authToken': '',
                'userName':'Test Admin',
                'userType': 'GUEST'
            },
            'permissions': {

            },
            'params': {

            }
        };

        /** Return loged in user profile 
       * Method:   getUserProfile
       * Access:   Public 
       * @return   profile object
       */
        serviceInstance.getUserProfile = function () {
            return serviceInstance.profile
        };

        return serviceInstance;
    }
]);