/*
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the configuration for the add page routing.
 */

(function() {
    'use strict';

    angular
        .module('app.add')
        .config(routerConfig);

    routerConfig.$inject = [
        '$stateProvider', '$urlRouterProvider'
    ];

    function routerConfig($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to add
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('add', {
                parent: 'root',
                url: '/add',
                views: {
                    'content@': {
                        templateUrl: 'app/views/edit-add/add/add.html',
                        controller: 'AddController',
                        controllerAs: 'vm'
                    }
                },
                data: {
                    requiresAuthentication: true
                }
            });
    }
})();
