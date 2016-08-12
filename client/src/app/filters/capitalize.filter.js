/**
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * Angular filter for capitalizing the first letter in a string.
 */

(function() {
    'use strict';

    angular
        .module('app.filters')
        .filter('capitalize', capitalize);

    function capitalize() {
        return function(input) {
            if (input != null) {
                return input.substring(0, 1).toUpperCase() + input.substring(1);
            }
        };
    }
})();
