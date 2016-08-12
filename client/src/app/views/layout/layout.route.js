/*
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the configuration for the layout routing.
 */

(function() {
	'use strict';

	angular
		.module('app.layout')
		.config(routerConfig);

	routerConfig.$inject = [
		'$stateProvider',
		'snapRemoteProvider'
	];

	function routerConfig($stateProvider, snapRemoteProvider) {

		snapRemoteProvider.globalOptions = {
			disable: 'right'
		};

	}
})();
