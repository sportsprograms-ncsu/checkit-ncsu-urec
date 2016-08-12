/*
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the configuration for the home routing.
 */

(function() {
	'use strict';

	angular
		.module('app.home')
		.config(routerConfig);

	routerConfig.$inject = [
		'$stateProvider', '$urlRouterProvider', 'snapRemoteProvider'
	];

	function routerConfig($stateProvider, $urlRouterProvider, snapRemoteProvider) {
		snapRemoteProvider.globalOptions = {
			disable: 'left'
		};

		// For any unmatched url, redirect to home
		$urlRouterProvider.otherwise('/');
		$stateProvider
            .state('home', {
                parent: 'root',
                url: '/home',
                views: {
                    'content@': {
                        templateUrl: 'app/views/home/home.html',
                        controller: 'HomeController',
						controllerAs: 'vm'
                    }
                },
                data: {
                    requiresAuthentication: true
                }
            });
	}
})();
