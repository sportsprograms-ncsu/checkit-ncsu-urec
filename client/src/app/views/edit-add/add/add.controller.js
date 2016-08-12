/*
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file defines the controller for the adding page.
 */

(function() {
    angular
        .module('app.add')
        .controller('AddController', AddController);

    AddController.$inject = [
        '$rootScope',
        '$timeout',
        '$document',
        'AssetService',
        'Foundation',
        'UtilService'
    ];

    /**
     * The add page controller function. Calls the getAssets function to load the data, then sets
     * That data to addable fields for the admin.
     * @param $rootScope
     * @param assetId - the ID of the asset being added. "" for a new asset.
     * @param AssetService - used to retrieve asset from the database
     * @param Foundation - used for error modals
     * @param UtilService
     * @constructor
     */
    function AddController($rootScope, $timeout, $document, AssetService, Foundation, UtilService) {
        var vm = this;

        vm.deviceData = {};
        vm.loadingState = 'contentSuccess';

        /**
         * Called when the 'save' button is clicked on the UI
         * Calls the AssetService to add the asset data to the database.
         * On a successful save this function navigates to the saved device's detail page.
         */
        vm.addAsset = function() {
            vm.loadingState = '';
            AssetService.addAsset(vm.deviceData)
                .then(function(data) {
                    vm.deviceData = data;
                    $rootScope.navigate('details', {
                        id: vm.deviceData.id
                    });
                }, function(err) {
                    UtilService.logError('add', 'addController', 'failed to save add: ' + err);
                    $rootScope.back();
                });
        }
    }
})();
