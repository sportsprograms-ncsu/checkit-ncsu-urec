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
        .filter('istoday', isTodayFilter);

    isTodayFilter.$inject = ['moment'];

    function isTodayFilter(moment) {
        return function(input) {
            if (moment(input).format('MM/DD/YYYY') === moment().format('MM/DD/YYYY')) {
                return moment(input).format('[Today]');
            }
            return moment(input).format('M/D/YYYY');
        };
    }
})();
