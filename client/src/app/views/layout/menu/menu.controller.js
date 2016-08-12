/**
 *
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file contains the definition for MenuController, the controller for the menu feature of the app.
 */

(function() {
    'use strict';

    angular
        .module('app.layout.menu')
        .controller('MenuController', MenuController);

    MenuController.$inject = [
        '$rootScope',
        '$timeout',
        'AuthService',
        'UserService',
        'UtilService'
    ];

    angular.module('app.layout').requires.push('app.layout.menu');

    /**
     * Definition of MenuController.
     * @param $rootScope
     * @param $timeout
     * @param AuthService -> Service for google authentication.
     * @param UserService -> Service for /users API.
     * @param UtilService -> Service being used for logging
     * @constructor
     */
    function MenuController($rootScope, $timeout, AuthService, UserService, UtilService) {

        var vm = this;

        //listen for an update to reservations
        var updateReservations = $rootScope.$on('ci:Update Reservations', function() {
            vm.loadingState = '';
            UserService.getReservations().then(_reservationSuccess, _reservationFail);
        });
        $rootScope.$on('$destroy', function() {
            updateReservations();
        });

        /**
         * Update the reservations.
         * @private
         */

        vm.getData = function() {
            $rootScope.$broadcast('ci:Update Reservations');
        }(); //call automatically on load;

        vm.isAdmin = UserService.getUserRole() > 0;

        /*
         * ===Private functions===
         */

        /**
         * Callback function for a getReservation success.
         * @param data -> the result returned from a getReservation success
         */
        function _reservationSuccess(data) {
            vm.reservations = data;
            vm.loadingState = 'contentSuccess';
        }

        /**
         * Callback function for a getReservation failure.
         * @param err -> error result from getting reservation fail
         */
        function _reservationFail(err) {
            switch (err.status) {
                case 401:
                    //user not authenticated or logged in
                    sessionStorage.setItem('isAuthenticated', false);
                    $rootScope.navigateBack('signin');
                    $rootScope.errorModalText(err);
                    //FoundationApi.publish('errormodal', 'open');
                    break;
                case 500:
                    //server error
                    vm.loadingState = 'networkError';
                    break;
                default:
                    //default to server error
                    vm.loadingState = 'networkError';
                    break;
            }
        }

        /**
         * Callback function for logout success.
         */
        function _logoutSuccess() {
            $rootScope.navigateBack('signin');
        }

        /**
         * Callback function for logout failure.
         * @param err -> error result returned from logout fail
         */
        function _logoutFailure(err) {
            UtilService.logError('layout.menu', 'MenuController', 'Logout failure: ' + err);
        }

        /**
         * Function on vm that, after waiting for the menu to close, calls the logout function from the AuthService.
         */
        vm.googleSignOut = function() {
            $timeout(function() {
                AuthService.logout().then(_logoutSuccess, _logoutFailure);
            }, 250);
        };

        /**
         * Function to add a device. Navigates to the edit page with the newDevice state
         */
        vm.addDevice = function() {
            $rootScope.navigate('add', {}, { location: false });
        };
    }

})();
