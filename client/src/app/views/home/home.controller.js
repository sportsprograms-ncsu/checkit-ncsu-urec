/**
 *
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the controller for the home controller
 */

(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = [
        '$rootScope',
        '$window',
        '$timeout',
        '$document',
        'ValidationService',
        'UtilService',
        '$cordovaBarcodeScanner',
        'ModalService',
        'moment'
    ];

    /**
     * @ngdoc function
     * @name HomeController
     * @description
     * The home page controller function.
     * @param $rootScope
     * @param $window
     * @param $timeout
     * @param $document
     * @param ValidationService
     * @param UtilService
     * @param $cordovaBarcodeScanner
     * @param ModalService
     * @param moment
     * @constructor
     */
    function HomeController(
        $rootScope,
        $window,
        $timeout,
        $document,
        ValidationService,
        UtilService,
        $cordovaBarcodeScanner,
        ModalService,
        moment) {

        var vm = this;

        ModalService.add('enterIdModal');
        ModalService.add('invalidId');
        ModalService.compile();

        //In the future, this initial array will be generated with a GET
        vm.categories = [{
            name: 'iPADS',
            image: 'assets/images/tablet_40x45.svg',
            value: 'tablet'
        }, {
            name: 'RADIOS',
            image: 'assets/images/radio_32x40.svg',
            value: 'radio'
        }, {
            name: 'KEYS',
            image: 'assets/images/key_30x30.svg',
            value: 'key'
        }, {
            name: 'MISC',
            image: 'assets/images/circle-thin-checkit-green.svg',
            value: 'misc'
        }, {
            name: 'CHECKED OUT',
            image: '',
            value: 'checkedout'
        }];
        //then the All will be added afterward
        vm.categories.splice(vm.categories.length, 0, {
            name: 'ALL',
            image: '',
            value: 'all'
        });

        vm.isOnDevice = UtilService.isOnDevice();

        /**
         * Opens the scanner
         *
         * TODO $rootScope is not preferred here
         * instead in the future use a service/factor for scanner operations
         */
        $rootScope.openScanner = function() {

            if (vm.isOnDevice) {
                //run scanner
                $cordovaBarcodeScanner.scan()
                    .then(function(barcodeData) {
                        vm.scanSuccess(barcodeData);
                    }, function(error) {
                        vm.scanFail(error);
                    });
            } else {
                ModalService.get('enterIdModal').open();
            }
        };

        /**
         * Called when the scanner successfully scans an object
         * Verifies that the String scanned is a valid Asset ID, retrieves
         * that asset, and creates a validation object around that device
         * @param scanObj -> the asset object from the scanner
         * @private
         */
        vm.scanSuccess = function(scanObj) {

            if (!scanObj.cancelled) {
                // Check to see if the device exists
                ValidationService.checkForAsset(scanObj.text)
                    .then(function() {
                        // Create the object for the validated record
                        ValidationService.newValidationObject(scanObj.text, moment().toISOString());
                        vm.goTo('details', { id: scanObj.text });
                    }, function() {
                        // Opens an invalidId modal to try again or cancel
                        ModalService.get('invalidId').open();
                    });
            }
        };

        /**
         * Called when the scanner cannot scan the object.
         * Not a common error, but may happen if the scanner is malfunctioning
         * @param error
         */
        vm.scanFail = function(error) {
            UtilService.logError('home', 'HomeController', 'Scan failed ' + error);
            ModalService.get('scannerError').open();
        };

        /**
         * Navigates to the details page for that particular asset.
         * Called after a scan is successful and asset exists.
         * @param state -> The details page
         * @param params -> The ID of the asset
         */
        vm.goTo = function(state, params) {
            $rootScope.navigate(state, params);
        };
    }
})();
