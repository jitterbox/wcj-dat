/**  Service descriptions
 *Used to provide a wrapper over $http service
 *All the customization required for $http service like caching & interceptors goes here
 *Expose method :get,post,put
  used as below ,
    get(uri, headers)
    post(uri, postData, headers) 
    put (uri, postData, headers) 
 * @return promise
*/
//TODO: Optimization : Going to optimized the httpHelper as required by the application

'use strict';
fsdtsApp.factory('httpHelper', ['$http', '$q',
    function ($http, $q) {
        //GET:
        function makeGetRequest(uri, headers) {
            var defer = $q.defer();
            $http.get(uri, headers)
           .success(function (data, status, headers, config) {
               defer.resolve(data);
           })
           .error(function (data, status, headers, config) {
               var errorMessages = generateErrorMessages(data);
               defer.reject(errorMessages);
               //defer.reject('HTTP Error: ' + data.Message);
           });
            return defer.promise;
        }
        //POST:
        function makePostRequest(uri, postData, headers) {
            var defer = $q.defer();
            if (postData) {
                $http.post(uri, postData, headers)
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        var errorMessages = generateErrorMessages(data);
                        defer.reject(errorMessages);
                        //defer.reject('HTTP Error: ' + data.Message);
                    });
            } else {
                defer.reject(['Invalid postData']);
            }
            return defer.promise;
        }

        //PUT:
        function makePutRequest(uri, postData, headers) {
            var defer = $q.defer();
            if (postData) {
                $http.put(uri, postData, headers)
                .success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    var errorMessages=generateErrorMessages(data);
                    defer.reject(errorMessages);
                });
            } else {
                defer.reject(['Invalid postData']);
            }
            return defer.promise;
        }

        //DELETE:
        function makeDeleteRequest(uri, postData, headers) {
            var defer = $q.defer();
            if (postData) {
                $http.put(uri, postData, headers)
                .success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    var errorMessages = generateErrorMessages(data);
                    defer.reject(errorMessages);
                    //defer.reject('HTTP Error: ' + data.Message);
                });
            } else {
                defer.reject(['Invalid postData']);
            }
            return defer.promise;
        }

        //PATCH:
        function makePatchRequest(uri, postData, headers) {
            var defer = $q.defer();
            if (postData) {
                $http({
                    method: 'PATCH',
                    url: uri,
                    data: postData
                }).
                 success(function (data, status, headers, config) {
                     defer.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    defer.reject('HTTP Error: ' + data.Message);
                });

            } else {
                defer.reject('Invalid postData');
            }
            return defer.promise;
        }

        var generateErrorMessages = function (error) {
            var errorMessages = [];
            try {
                for (var key in error.ModelState) {
                    var message = error.ModelState[key][0];
                    errorMessages.push(message);
                }
            }
            catch (err) {
                console.log(err);
            }
            return errorMessages;
        };

        return {
            get: function (uri, headers) {
                return makeGetRequest(uri);
            }, post: function (uri, postData, headers) {
                return makePostRequest(uri, postData, headers);
            }, put: function (uri, postData, headers) {
                return makePutRequest(uri, postData, headers);
            }, delete: function (uri, postData, headers) {
                return makeDeleteRequest(uri, postData, headers);
            }, patch: function (uri, postData, headers) {
                return makePatchRequest(uri, postData, headers);
            }

        };
    }
]);