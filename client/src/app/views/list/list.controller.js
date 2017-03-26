/**
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the definition for the list controller for the list page.
 */

(function () {
    'use strict';

    angular
        .module('app.list')
        .controller('ListController', ListController);

    ListController.$inject = [
        '$rootScope',
        '$timeout',
        'type',
        'AssetService',
        'ModalService',
        'RecordService',
        'moment',
        '$q'
    ];

    /**
     * Function for the list controller. Retrieves the data and assesses its success or fail.
     * @param $rootScope
     * @param $timeout
     * @param type
     * @param AssetService
     * @param ModalService
     * @constructor
     */
    function ListController($rootScope, $timeout, type, AssetService, ModalService, RecordService, moment, $q) {

        var vm = this;

        vm.getData = function () {
            vm.loadingState = '';
            if (type !== 'all') {
                AssetService.getAssets(type, null).then(listSuccess, listFail); //100ms
            } else {
                AssetService.getAssets(null, null).then(listSuccess, listFail);
            }
        };
        vm.getData();

        /**
         * Function called if the promise succeeded. Simply publishes the data.
         *
         * @param data
         */
        function listSuccess(data) {
            vm.list = data;
            $timeout(function () {
                vm.loadingState = 'contentSuccess';
            }, 100);
        }

        /**
         * Function called if the promise failed.
         * Publishes the proper error modal according to the error code.
         * @param err -> The error code returned by the promise.
         */
        function listFail(err) {
            switch (err.status) {
                case 400:
                    //error while getting list of assets
                    $rootScope.back();
                    $rootScope.errorModalText(err);
                    ModalService.get('errorModal').open();
                    break;
                case 404:
                    //no assets found, show list as empty
                    vm.loadingState = 'contentEmpty';
                    break;
                case 500:
                    //server error
                    vm.loadingState = 'networkError';
                    break;
                default:
                    vm.loadingState = 'networkError';
                    break;
            }
        }

        /**
         * Gathers the chronological history for all devices to be displayed.
         */
        vm.chronologicalHistory = function () {
            var historicalRecords = [];
            var assets = [];
            var chain = $q.when();

            AssetService.getAssets(null, null).then(function (data) {
                gatherRecordsForAssets(data, historicalRecords, assets, chain)
            }, getAssetsFail);
        };

        /** 
         * Function called if the getAssets promise succeeded.
         * Gets the records for each asset and sorts them chronologically.
         * @param data the data returned by the promise
         * @param historicalRecords array to store the historical asset records
         * @param assets array that stores the assets returned by the promise
         * @param chain variable to chain the RecordService function calls
         */
        var gatherRecordsForAssets = function (data, historicalRecords, assets, chain) {
            for (var i = 0; i < data.length; i++) {
                assets.push(data[i]);
                chain = chain.then(getChronologicalRecords.bind(null, assets, i, historicalRecords));
            }

            chain = chain.then(function () {
                historicalRecords.sort(sortByCreatedTime);

                // now must display the records (via console for now)
                for (var k = 0; k < historicalRecords.length; k++) {
                    // TODO keep these statements until info is displayed on page
                    console.log('--------------------');
                    console.log('Record #' + (k + 1));
                    console.log('Borrower name: ' + historicalRecords[k].recordInfo.borrower.name.first + ' ' + historicalRecords[k].recordInfo.borrower.name.last);
                    console.log('Asset Name: ' + historicalRecords[k].assetName);
                    console.log('Record Type: ' + historicalRecords[k].recordInfo.type);
                    console.log('Record Date: ' + historicalRecords[k].recordInfo.created);
                    console.log('--------------------');
                }
            });
        };

        /**
         * Function called if the getAssets promise failed.
         * Publishes the proper error modal according to the error code.
         * @param err the error code returned by the promise
         */
        var getAssetsFail = function (err) {
            switch (err.status) {
                case 400:
                    //error while getting list of assets
                    $rootScope.back();
                    $rootScope.errorModalText(err);
                    ModalService.get('errorModal').open();
                    break;
                case 404:
                    //no assets found, show list as empty
                    vm.loadingState = 'contentEmpty';
                    break;
                case 500:
                    //server error
                    vm.loadingState = 'networkError';
                    break;
                default:
                    vm.loadingState = 'networkError';
                    break;
            }
        };

        /** 
         * Gets the chronological records for an asset.
         * @param assets array storing all assets from getAssets function call
         * @param index points to the current index of the asset array to use for the getRecords function
         * @param historicalRecords array to store the historical asset records
         * @return all records within the past 3 days for the asset
         */
        var getChronologicalRecords = function (assets, index, historicalRecords) {
            // console.log(assets);
            return RecordService.getRecords(assets[index].id).then(function (recordData) {
                var three_days_ago = moment().milliseconds(0).seconds(0).minutes(0).hours(0).subtract(3, 'days');

                for (var j = 0; j < recordData.records.length; j++) {
                    if (moment(recordData.records[j].created).isAfter(three_days_ago)) {
                        // Create a detailRecord to store the record fields and the asset id together
                        var detailRecord = {
                            'recordInfo': recordData.records[j],
                            'assetName': assets[index].name
                        };
                        historicalRecords.push(detailRecord);
                    }
                }

            }, function (err) {
                switch (err.status) {
                    case 400:
                        //error while getting list of records
                        $rootScope.back();
                        $rootScope.errorModalText(err);
                        ModalService.get('errorModal').open();
                        break;
                    case 404:
                        //no records found, show list as empty
                        vm.loadingState = 'contentEmpty';
                        break;
                    case 500:
                        //server error
                        vm.loadingState = 'networkError';
                        break;
                    default:
                        vm.loadingState = 'networkError';
                        break;
                }
            });
        };

        /**
         * Sorts two asset records based on the created date for the record.
         * @param a the first record to compare
         * @param b the second record to compare
         * @return 0 if record create date is identical, 1 if record a is after record b, -1 if record a is
         * before record b
         */
        function sortByCreatedTime(a, b) {
            if (moment(a.recordInfo.created).isSame(b.recordInfo.created)) {
                return 0;
            } else if (moment(a.recordInfo.created).isAfter(b.recordInfo.created)) {
                return 1;
            } else {
                return -1;
            }
        }
    }

})();
