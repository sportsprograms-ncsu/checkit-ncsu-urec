/**
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the directive definition for the details page delete view.
 */

(function() {
    'use strict';

    angular
        .module('app.details')
        .directive('deviceDelete', DeviceDeleteDirective);

    DeviceDeleteDirective.$inject = [];

     /**
     * @ngdoc directive
     * @name DeviceDeleteDirective
     * @description
     * Function returning the device-delete directive set up.
     * @returns {*} -> directive object as defined by AngularJS (https://docs.angularjs.org/guide/directive)
     */
    function DeviceDeleteDirective() {

        return {
            restrict: 'E',
            replace: false,
            controller: DeviceDeleteController,
            controllerAs: 'deviceDeleteCtrl',
            bindToController: {
                deviceId: '=',
                deviceName: '=',
                deleteDevice: '='
            },
            templateUrl: 'app/views/details/details.directives/device-delete/device-delete.template.html'
        };
    }

    DeviceDeleteController.$inject = [
        '$timeout',
        '$document',
        'UtilService',
        'AssetService',
        'ModalService'
    ];

    /**
     * @ngdoc function
     * @description
     * Controls the deviceDelete directive
     * @param $timeout
     * @param $document
     * @param UtilService
     * @param AssetService
     * @param ModalService
     * @constructor
     */

    function DeviceDeleteController($timeout, $document, UtilService, AssetService, ModalService) {
        var deviceDeleteCtrl = this;
        $timeout(function() {
            //DOM has finished rendering
            ModalService.add('deleteSuccessModal');
        });

        /**
         * Deletes the asset.
         * Used with ng-click by the delete button on the delete view.
         */
        deviceDeleteCtrl.deleteDevice.fn = function() {
            if (deviceDeleteCtrl.deviceName === deviceDeleteCtrl.deleteName) {
                AssetService.deleteAsset(deviceDeleteCtrl.deviceId)
                    .then(function() {
                        ModalService.get('deleteSuccessModal').open();
                    }, function(error) {
                        UtilService.logError('details', 'detailsContainer', 'Delete Failed ' + error);
                    });
            } else {
                UtilService.logError('details', 'detailsContainer', 'Delete name doesn\'t match');
                ModalService.get('deleteFailedModal').open();

                deviceDeleteCtrl.deleteName = '';
            }
        };

    }
})();




