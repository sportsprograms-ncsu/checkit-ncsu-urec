/**
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the definition for the asset-trait directive.
 */

(function() {
    'use strict';
    angular
        .module('app.editAdd')
        .directive('assetTrait', assetTrait);

    assetTrait.$inject = ['$compile', 'appConfig'];

    /**
     * This function returns the directive set up.
     *
     * @param $compile
     * @param appConfig
     * @returns {*} Directive object as defined by AngularJS
     */
    function assetTrait($compile, appConfig) {

        var linker = function(scope, element) {

            scope.newAccessory = undefined;

            var template = '';

            var traitType = (angular.isArray(scope.fieldValue)) ? 'array' : 'string';
            var name = scope.key.replace(/\s+/g, '');

            switch (traitType) {
                case 'string':
                    if (scope.inputType === 'dropdown') {
                        scope.dropOptions = appConfig.assetEnum[scope.key];
                        if (!scope.fieldValue) {
                            scope.fieldValue = scope.dropOptions[0];
                        }

                        template = '<select ' +
                            'ng-required="$parent.editform.' +
                            name + '.$touched || $parent.editform.$submitted" name="' + name + '"' +
                            'dir="rtl" class="value" ng-model="fieldValue"' +
                            'ng-options="o for o in dropOptions"></select>' +
                            '<span class="form-error" ng-show="$parent.editform.' +
                            name + '.$error.required">{{key | capitalize}} is required.</span>';
                    } else if (scope.inputType === 'textarea') {
                        template = '<textarea class="value" ng-model="fieldValue"></textarea>';
                    } else {
                        template = '<input name="' + name + '"' +
                            'ng-required="$parent.editform.' +
                            name + '.$touched || $parent.editform.$submitted" ' +
                            ' class="value" ng-model="fieldValue" />' +
                            '<span class="form-error" ng-show="$parent.editform.' +
                            name + '.$error.required">{{key | capitalize}} is required.</span>';
                    }
                    break;
                case 'array':
                    template =
                        '<ul><li class="list-item" ng-repeat="val in fieldValue track by $index"' +
                        'ng-swipe-left="removeAccessory($index)">{{val}}</li></ul>' +
                        '<div class="add-accessory"><input type="text" ng-model="newAccessory"' +
                        'class="new-accessory" placeholder="Add a new accessory..."/>' +
                        '<button class="checkit-button add-button" ng-click="addToAccessories()"' +
                        'ng-disabled="!newAccessory">' +
                        '<i class="fa fa-plus"></i></button></div>';
                    break;
                default:
                    template =
                        '<div class="title">Broken Attribute:</div>' +
                        '<div class="value">Check Database</div>';
            }

            //Wrap generated template in some divs
            template = '<label><div class="title">{{key | capitalize}}:</div><div class="optionselect">' +
                template +
                '</div></label><hr>';

            element.html(template);
            $compile(element.contents())(scope);
        };

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            link: linker,
            scope: {
                fieldValue: '=',
                key: '@',
                inputType: '@',
                deleteAttribute: '&'
            },
            controller: AssetTraitCtrl
        };
    }

    AssetTraitCtrl.$inject = [
        '$scope'
    ];

    /**
     * @ngdoc function
     * @description
     * Controls the assetTrait directive
     * @constructor
     */
    function AssetTraitCtrl($scope) {

        /**
         * Adds to the accessory list.
         * Accessories are additional items that come with a device.
         * I.e. a charger, wall mount, etc.
         */
        $scope.addToAccessories = function() {
            if (angular.isDefined($scope.newAccessory)) {
                $scope.fieldValue.push($scope.newAccessory);
                $scope.newAccessory = undefined;
            }
        };

        /**
         * Removes an accessory from the list.
         * @param  {number} idx Index of the accessory to remove
         */
        $scope.removeAccessory = function(idx) {
            $scope.fieldValue.splice(idx, 1);
        };
    }
})();
