/*global angular */

/**
 *
 * @type {angular.Module}
 */
angular.module('nearestcoffee', ['ngRoute'])
    .config(function ($routeProvider) {
        'use strict';

        var routeConfig = {
            controller: 'IndexCtrl',
            templateUrl: 'nearestcoffee_index.html'
        };

        $routeProvider
            .when('/', routeConfig)
            .otherwise({
                redirectTo: '/'
            });
    });
