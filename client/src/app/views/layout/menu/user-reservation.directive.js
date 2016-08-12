/**
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file contains the definition for userReservation, a directive used in the menu.
 */

(function() {
    'use strict';

    angular
        .module('app.layout.menu')
        .directive('userReservation', userReservationDirective);

    userReservationDirective.$inject = [];

    function userReservationDirective() {
        return {
            retrict: 'E',
            replace: false,
            templateUrl: 'app/views/layout/menu/user-reservation.template.html',
            controller: userResController,
            controllerAs: 'userCtrl',
            bindToController: {
                content: '='
            }
        };
    }

    userResController.$inject = [
        '$rootScope',
        '$timeout'
    ];

    function userResController($rootScope, $timeout) {
        var userCtrl = this;
        userCtrl.checkZone = function(end) {
            if (end === 'OVERDUE') {
                return 'dangerzone';
            }
            return 'subtext-color';
        };

        userCtrl.menuNavigate = function(state, params) {
            //Wait for menu to close, then nav.
            $timeout(function() {
                $rootScope.navigate(state, params);
            }, 250);
        };
    }
})();
