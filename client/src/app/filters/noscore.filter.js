/**
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * Angular filter for replacing underscores with spaces in a string.
 */

(function() {
    'use strict';

    angular
        .module('app.filters')
        .filter('noscore', noScore);

    function noScore() {
        return function(input) {
            if (input != null) {
                input = input.split('_');

                var ret = input[0];
                for (var i = 0; i < input.length; i++) {
                    if (i !== 0) {
                        ret = ret + ' ' + input[i];
                    }
                }

                return ret;
            }
        };
    }
})();
