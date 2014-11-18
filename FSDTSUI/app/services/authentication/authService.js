/**  Service descriptions
 *Implementing user authentication & authorization module
 *Expose method :
    getUserProfile
    login
    logout
 * @return promise

*/

//TODO: Putting actual implementation : Dummy code need to be removed & implementation need to be done as per authentication and authorization mechanism
'use strict';
fsdtsApp.factory('authService', ['$http', '$q',
    function ($http, $q) {
        var serviceInstance = {};

        serviceInstance.getUserProfile = function () {
        };

        serviceInstance.logIn = function () {
        };

        serviceInstance.logOut = function () {
        };

        return serviceInstance;
    }
]);