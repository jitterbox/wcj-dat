/**  Service descriptions
 *Used to 
    1)contain loged in user profile 
    2)sharing state and data of user among different views 
 *Expose method :
    getUserProfile
*/

//TODO: Putting actual implementation : Dummy code need to be removed & implementation need to be done as per authentication and authorization mechanism
'use strict';
fsdtsApp.factory('userProfileService', ['$http','$cookieStore',
    function ($http, $cookieStore) {
        var serviceInstance = {};
        //Profile object used to contain role based profile details
        serviceInstance.profile = {};
        //TODO : Dummy user profile & needs to be initalized from authService
        //#region Default userprofile initialization
        var userProfile=$cookieStore.get('userProfile');
        if (userProfile) {//If user profile is in cookies 
            serviceInstance.profile = userProfile;
        } else {
            //Else set default user profile
            serviceInstance.profile = {
                'status': '',
                'loggedIn': false,
                'credentials': {
                    'authToken': '',
                    'userName': 'Test Admin',
                    'userType': 'GUEST'
                },
                'permissions': {

                },
                'params': {

                }
            };
        }
        //#endregion

        /** Return loged in user profile 
       * Method:   getUserProfile
       * Access:   Public 
       * @return   profile object
       */
        serviceInstance.getUserProfile = function () {
            return serviceInstance.profile
        };

        /** Set loged in user profile 
       * Method:   setUserProfile
       * Access:   Public 
       * Param : userProfile Object
       * @return   profile object
       */
        serviceInstance.setUserProfile = function (userProfileObj) {
            //TODO: Maping of userProfileObj to  serviceInstance.profile
            serviceInstance.profile = userProfileObj;
            $cookieStore.put('userProfile', serviceInstance.profile);
            return serviceInstance.profile
        };

        /** Reset loged in user profile 
       * Method:   resetUserProfile
       * Access:   Public 
       * @return   profile object
       */
        serviceInstance.resetUserProfile = function () {
            serviceInstance.profile = {
                'status': '',
                'loggedIn': false,
                'credentials': {
                    'authToken': '',
                    'userName': 'Test Admin',
                    'userType': 'GUEST'
                },
                'permissions': {

                },
                'params': {

                }
            };
            $cookieStore.remove('userProfile');
            return serviceInstance.profile
        };

        /** Used to set user define parametes to share data across views
       * Method:   setUserParams
       * Access:   Public 
       */
        serviceInstance.setUserParams = function (ParamObj) {
            if (serviceInstance.profile) {
                serviceInstance.profile.params = ParamObj;
                $cookieStore.put('userProfile', serviceInstance.profile);
            }
        };

        /** Return userdefine parameters of loggedin user
      * Method:   getUserParams
      * Access:   Public 
      * @return   serviceInstance.profile.params
      */
        serviceInstance.getUserParams = function () {
            if (serviceInstance.profile) {
                return serviceInstance.profile.params;
            } else {
                return {};
            }
        };

        return serviceInstance;
    }
]);