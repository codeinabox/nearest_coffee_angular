
/*global angular */

/**
 */
angular.module('nearestcoffee')
    .factory('geo', function ($q) {
        'use strict';

        return {

            lookup: function() {
                var deferred = $q.defer();

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        function(pos) {
                            deferred.resolve(pos);
                        },
                        function(err) {
                            deferred.reject(err);
                        }
                    );
                } else {
                    error('not supported');
                }

                return deferred.promise;
            }
        };

    });
