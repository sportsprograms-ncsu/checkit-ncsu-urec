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
        .service('ValidationService', ValidationService);

    ValidationService.$inject = [
        'moment',
        '$q',
        'AssetService',
        'UtilService'
    ];

    /**
     * @ngdoc service
     * @name ValidationService
     * @description
     * Function which defines the validation server
     * @param moment
     * @param $q
     * @param AssetService
     * @param UtilService
     * @constructor
     */
    function ValidationService(moment, $q, AssetService, UtilService) {

        return {

            /**
             * Checks to see if the scanned device is on the database
             *
             * @param targetId -> the ID of the device scanned
             * @returns {*} -> Promise object whose data is the updated asset details
             */
            checkForAsset: function(targetId) {


                var defer = $q.defer(); // initialize promise defer

                if (angular.isUndefined(targetId)) {
                    UtilService.logError('services', 'ValidationService', 'Target ID was undefined.');
                    defer.reject();
                } else {
                    // GET the device (via AssetService)
                    AssetService.getAssets(null, targetId)
                        .then(function(data) { // if the promise was fulfilled
                            // Since the AssetService will reject the promise if the ID was invalid,
                            // we can safely assume that the ID was valid if it resolves the promise
                            UtilService.logInfo('services', 'ValidationService', 'Target ID exists!');
                            defer.resolve(data);
                        }, function(err) { // if the promise was rejected
                            UtilService.logError('services', 'ValidationService', 'Target ID did not exist. ' + err);
                            defer.reject();
                        });
                }
                return defer.promise;
            },

            /**
             * Adds a new Validation object to session storage
             * Replaces the old item, if the session storage has one currently
             * @param id -> ID of the item being replaced
             * @param time -> In ISO String format
             */
            newValidationObject: function(id, time) {

                var valid = angular.toJson({
                    assetId: id,
                    isValidated: true,
                    validTime: time
                });

                sessionStorage.setItem('validObject', valid);
            },

            /**
             * Returns whether the time limit of the verified object has passed or not
             * Current Time Limit is 10 minutes
             *
             * @param currentTime the current time (as an ISO string)
             * @returns {boolean}
             */
            checkForTimeOut: function(currentTime) {

                // Check to see if there isn't anything in the session storage
                if (!sessionStorage.getItem('validObject')) {
                    return false;
                }

                var currValid = angular.fromJson(sessionStorage.getItem('validObject'));

                var curTimeMoment = moment(currentTime);
                var validatedMoment = moment(currValid.validTime);

                return (validatedMoment.add(10, 'm') > curTimeMoment);
            },

            /**
             * Checks that the device ID passed in is the same ID as the one stored as validated
             * @param currentId the ID being checked
             * @return {boolean}
             */
            checkValidatedId: function(currentId) {

                // Check to see if there isn't anything in the session storage
                if (!sessionStorage.getItem('validObject')) {
                    return false;
                }

                var currValid = angular.fromJson(sessionStorage.getItem('validObject'));

                return (currentId === currValid.assetId);
            },

            /**
             * Deletes the validation object from sessionStorage
             */
            clearValidation: function() {
                sessionStorage.removeItem('validObject');
            }
        };
    }
})();
