/**
 *
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * Defines the service for communicating with the record API endpoints
 */

(function() {
    'use strict';

    angular
        .module('app.services')
        .service('RecordService', RecordService);

    RecordService.$inject = [
        '$q',
        '$rootScope',
        'appConfig',
        '$http',
        'UtilService'
    ];

    /**
     * @ngdoc service
     * @name RecordService
     * @description
     * Function which defines the record service
     *
     * @param $q
     * @param $rootScope
     * @param appConfig -> to get the api host url
     * @param $http
     * @param UtilService -> for formatted debug logging
     *
     */
    function RecordService($q, $rootScope, appConfig, $http, UtilService) {
        return {

            /**
             * Makes an HTTP call to the server and GETs a list of records
             * @param assetId
             * @returns {*}
             */
            getRecords: function(assetId) {
                var defer,
                    err,
                    request;

                defer = $q.defer();

                request = {
                    method: 'GET',
                    withCredentials: true,
                    url: appConfig.apiHost + 'api/v1/records/' + assetId
                };

                $http(request)
                    .success(function(data) {
                        //GET is successful
                        UtilService.logInfo('services', 'RecordService', 'getRecords successful');

                        defer.resolve(data);
                    })
                    .error(function(data, status) {
                        // GET is unsuccessful
                        if (status === 404) {
                            err = 'No assets founds under this category. ';
                        }
                        UtilService.logError('services', 'RecordService', err + status);
                        defer.reject(data);
                    });
                return defer.promise;
            }
        };
    }
})();
