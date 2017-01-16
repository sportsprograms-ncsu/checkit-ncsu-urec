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
    ];

    /**
     * @ngdoc function
     * @name HomeController
     * @description
     * The home page controller function.
     * @constructor
     */
    function HomeController() {

        var vm = this;

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
    }
})();
