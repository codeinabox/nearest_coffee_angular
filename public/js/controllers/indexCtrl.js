
/*global angular */

/**
 * The main controller for the app. The controller:
 */
angular.module('nearestcoffee')
    .controller('IndexCtrl', function IndexCtrl($scope, $routeParams, $filter, geo, foursquare) {
        'use strict';

        $scope.coords = {};

        $scope.nearestCoffee = function() {
            geo.lookup().then(function(res) {
                $scope.coords = res.coords;

                foursquare.getVenues($scope.coords.latitude, $scope.coords.longitude).then(function(venues) {
                    $scope.venues = venues;
                });
            });
        };

    });
