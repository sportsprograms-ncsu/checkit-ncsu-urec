/*
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the configuration for the list page routing.
 */

(function() {
    'use strict';

    angular
        .module('app.list')
        .config(routerConfig);

    routerConfig.$inject = [
        '$stateProvider'
    ];

    /**
     * Configures the list page module.
     * @param $stateProvider -> for setting up route
     * @constructor
     */
    function routerConfig($stateProvider) {
        $stateProvider
            .state('list', {
                parent: 'root',
                url: '/list/:type',
                views: {
                    'content@': {
                        templateUrl: 'app/views/list/list.html',
                        controller: 'ListController',
                        controllerAs: 'vm',
                        resolve: {
                            type: function($stateParams) {
                                return $stateParams.type;
                            }
                        }
                    }
                },
                data: {
                    requiresAuthentication: true
                }
            });
    }
})();
