/**
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the directive definition for an asset category.
 */

(function() {
    'use strict';

    angular
        .module('app.home')
        .directive('category', CategoryDirective);

    CategoryDirective.$inject = [];

    /**
     * @ngdoc directive
     * @name CategoryDirective
     * @description
     * #
     */
    function CategoryDirective() {

        return {
            restrict: 'E',
            replace: false,
            controller: CategoryController,
            controllerAs: 'categoryCtrl',
            bindToController: {
                content: '='
            },
            templateUrl: 'app/views/home/category.template.html'
        };
    }

    CategoryController.$inject = [
        '$rootScope'
    ];

    function CategoryController($rootScope) {
        var categoryCtrl = this;
        categoryCtrl.goToList = function(state, params) {
            $rootScope.navigate(state, params);
        };
    }
})();
