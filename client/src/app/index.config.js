/**
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the definition for the Configuration of the application.
 */

(function() {
	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = [
		'$logProvider',
        'fitTextConfigProvider'
	];

	function config($logProvider, fitTextConfigProvider) {
		// Enable log
		$logProvider.debugEnabled(true);
		fitTextConfigProvider.config = {
            //debounce: _.debounce,
            //delay: 1000,
            min: '18'
        };

	}
})();
