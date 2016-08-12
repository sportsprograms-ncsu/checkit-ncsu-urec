/*
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the configuration for the signin page routing.
 */

(function() {
	'use strict';

	angular
		.module('app.signin')
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
		$stateProvider
			.state('signin', {
				url: '/',
				views: {
					'content@': {
						templateUrl: 'app/views/signin/signin.html',
						controller: 'SigninController',
						controllerAs: 'vm'
					}
				},
				data: {
					requiresAuthentication: false
				}
			});
	}
})();
