/*global angular */

/**
 */
angular.module('nearestcoffee')
    .factory('foursquare', function ($q, $http) {
        'use strict';

        return {
            getVenues: function (lat, long) {
                var deferred = $q.defer();

                $http.get('/venues?lat='+lat+'&long='+long).then(function (response) {
                    deferred.resolve(response.data);
                });

                return deferred.promise;
            }
        };

    });

