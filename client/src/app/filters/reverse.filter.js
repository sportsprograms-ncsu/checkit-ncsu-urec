/**
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * Angular filter for replacing the displayed return date with 'Today' if the selected day is the current day.
 */
(function() {
    'use strict';

    angular
        .module('app.filters')
        .filter('reverse', reverse);

    function reverse() {
        return function(items) {
            return items.slice().reverse();
        };
    }
})();
