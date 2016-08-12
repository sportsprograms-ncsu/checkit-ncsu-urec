/*
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the configuration for the edit page routing.
 */

(function() {
    'use strict';

    angular
        .module('app.edit')
        .config(routerConfig);

    routerConfig.$inject = [
        '$stateProvider', '$urlRouterProvider'
    ];

    function routerConfig($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to edit
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('edit', {
                parent: 'root',
                url: '/edit/:id',
                views: {
                    'content@': {
                        templateUrl: 'app/views/edit-add/edit/edit.html',
                        controller: 'EditController',
                        controllerAs: 'vm',
                        resolve: {
                            assetId: function($stateParams) {
                                return $stateParams.id;
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
