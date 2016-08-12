/**
 *
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * Defines the utility service
 */

(function() {
    'use strict';

    angular
        .module('app.services')
        .service('UtilService', UtilService);

    UtilService.$inject = [
        '$log',
        '$window',
        'moment'
    ];

    /**
     * @ngdoc service
     * @name UtilService
     * @description
     * Function that defines the UtilService service
     * @param $log
     * @param $window
     * @param moment
     * @constructor
     */

    function UtilService($log, $window, moment) {

        /**
         * Returns whether or not the program is running on a device
         * @returns {Boolean}
         */
        this.isOnDevice = function() {
            return $window.Cordova || $window.cordova;
        };

        /**
         * Takes a prefix and the dueDate and returns a status string (OVERDUE or the prefix plus formatted date).
         * @param prefix -> the prefix to prepend
         * @param dueDate -> The dueDate to examine
         * @returns {*}
         */
        this.formatDueDate = function(prefix, dueDate) {
            // Checks current date with due date to see if device is overdue
            var due = moment(dueDate); //dueDate is ISO, so compare with UTC moment[now]
            if (due.isBefore(moment.utc())) {
                // Asset is overdue, return 'OVERDUE'
                return 'OVERDUE';
            } else {
                // Asset is not yet due, return due date
                return (prefix + due.format('M/D'));
            }
        };

        /**
         * uses the $log to log an error to the console
         * @param calledBy - what module called it?
         * @param calledIn - what component, function, or service called it?
         * @param message - what needs to be said?
         */
        this.logError = function(calledBy, calledIn, message) {
            $log.error(calledBy + '.' + calledIn + ': ' + message);
        };

        /**
         * uses the $log to log information to the console
         * @param calledBy - what module called it?
         * @param calledIn - what component, function, or service called it?
         * @param message - what needs to be said?
         */
        this.logInfo = function(calledBy, calledIn, message) {
            $log.info(calledBy + '.' + calledIn + ': ' + message);
        };

        /**
         * uses the $log to log a warning to the console
         * @param calledBy - what module called it?
         * @param calledIn - what component, function, or service called it?
         * @param message - what needs to be said?
         */
        this.logWarn = function(calledBy, calledIn, message) {
            $log.warn(calledBy + '.' + calledIn + ': ' + message);
        };

        /**
         * uses the $log to log debug information to the console
         * @param calledBy - what module called it?
         * @param calledIn - what component, function, or service called it?
         * @param message - what needs to be said?
         */
        this.logDebug = function(calledBy, calledIn, message) {
            $log.debug(calledBy + '.' + calledIn + ': ' + message);
        };
    }
})();
