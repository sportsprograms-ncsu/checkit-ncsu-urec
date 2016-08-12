/**
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the definition for the Routing of the application.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .config(routerConfig);

    routerConfig.$inject = [
        '$stateProvider', '$urlRouterProvider', 'snapRemoteProvider'
    ];

    function routerConfig($stateProvider, $urlRouterProvider, snapRemoteProvider) {
        snapRemoteProvider.globalOptions = {
            disable: 'left'
        };

        // For any unmatched url, redirect to signin
        $urlRouterProvider.otherwise('/');
        /**
         * This abstract route serves as the base route for all other routes with parent: 'base'.
         * It loads the default page elements, topbar, menu, and header
         */
        $stateProvider
            .state('root', {
                url: '',
                abstract: true,
                views: {
                    'menu@': {
                        templateUrl: 'app/views/layout/menu/menu.html',
                        controller: 'MenuController',
                        controllerAs: 'vm'
                    },
                    'header@': {
                        templateUrl: 'app/views/layout/header/header.html',
                        controller: 'HeaderController',
						controllerAs: 'vm'
                    }
                }
            });
    }
})();
