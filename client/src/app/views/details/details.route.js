/*
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the configuration for the details page routing.
 */

(function() {
	'use strict';

	angular
		.module('app.details')
		.config(routerConfig);

	routerConfig.$inject = [
		'$stateProvider'
	];

	/**
	 * Configures the details page module.
	 * @param $stateProvider -> for setting up route
	 * @constructor
	 */
	function routerConfig($stateProvider) {
		$stateProvider
			.state('details', {
				parent: 'root',
				url: '/details/:id',
				views: {
					'content@': {
						templateUrl: 'app/views/details/details.html',
						controller: 'DetailsController',
						controllerAs: 'vm',
						resolve: {
						/**
						 * returns the id of the asset being fetched so the controller can use it
						 * @param $stateParams -> parameters of the route
						 * @returns id -> ObjectId
						 */
						assetId: function ($stateParams) {
							return $stateParams.id; // get the asset details
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
