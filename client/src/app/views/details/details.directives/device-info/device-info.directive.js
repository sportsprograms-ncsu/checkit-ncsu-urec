/*
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the directive definition for a device's info block
 */

(function() {
    'use strict';

    angular
        .module('app.details')
        .directive('info', InfoDirective);

    InfoDirective.$inject = [];

    /**
     * @ngdoc directive
     * @name InfoDirective
     * @description
     * Function returning the device-delete directive set up.
     * @returns {*} -> directive object as defined by AngularJS (https://docs.angularjs.org/guide/directive)
     */
    function InfoDirective() {

        return {
            restrict: 'E',
            replace: false,
            controller: InfoController,
            controllerAs: 'infoCtrl',
            bindToController: {
                content: '='
            },
            template: '<div class="title" ng-class="infoCtrl.content.titleModifier">{{infoCtrl.content.title}}:</div>' +
                '<div class="value" ng-class="infoCtrl.content.valueModifier">{{infoCtrl.content.value}}</div>'
        };
    }

    InfoController.$inject = [];

    function InfoController() {}
})();
