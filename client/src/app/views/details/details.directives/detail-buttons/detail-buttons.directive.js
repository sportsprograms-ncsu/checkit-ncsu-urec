/**
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the directive definition for the details page checkin/out buttons
 */

(function() {
    'use strict';

    angular
        .module('app.details')
        .directive('detailButtons', DetailButtonsDirective);

    DetailButtonsDirective.$inject = [];

    /**
     * @ngdoc directive
     * @name DetailButtonsDirective
     * @description
     * Function returning the detail-buttons directive set up.
     * @returns {*} -> directive object as defined by AngularJS (https://docs.angularjs.org/guide/directive)
     *
     */
    function DetailButtonsDirective() {

        return {
            restrict: 'E',
            replace: false,
            controller: DetailButtonsController,
            controllerAs: 'detailButtonsCtrl',
            bindToController: {
                startCheckInOut: '&',
                deleteDevice: '=',
                checkOutDevice: '&',
                pageState: '=',
                buttonStyles: '=',
                deviceId: '='
            },
            templateUrl: 'app/views/details/details.directives/detail-buttons/detail-buttons.template.html'
        };
    }

    DetailButtonsController.$inject = [
        '$rootScope',
        'UserService'
    ];

    /**
     * @ngdoc function
     * @description
     * Controls the detailButtons directive
     * @param rootScope
     * @param UserService
     * @constructor
     */
    function DetailButtonsController($rootScope, UserService) {
        var detailButtonsCtrl = this;

        detailButtonsCtrl.isAdmin = (UserService.getUserRole() > 0) ? true : false;

        /**
         * Changes the page's view state.
         * Used with ng-click
         * @param state -- the page state to navigate to
         */
        detailButtonsCtrl.switchView = function(state) {
            detailButtonsCtrl.pageState = state;
        }

        /**
         * Navigates to the edit page of an asset
         * Used with ng-click
         */
        detailButtonsCtrl.editDevice = function() {
            $rootScope.navigate('edit', {
                id: detailButtonsCtrl.deviceId
            });
        };
    }
})();
