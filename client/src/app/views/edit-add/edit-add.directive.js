/*
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * Scss defined for the add attribute directive.
 */

(function() {
    'use strict';

    angular
        .module('app.editAdd')
        .directive('editAdd', editAddDirective);

    editAddDirective.$inject = [];

    /**
     * @ngdoc directive
     * @name editAddDirective
     * @description
     * Function returning the edit-add directive set up.
     * @returns {*} -> directive object as defined by AngularJS (https://docs.angularjs.org/guide/directive)
     */
    function editAddDirective() {

        return {
            restrict: 'E',
            replace: false,
            controller: editAddController,
            controllerAs: 'editAddCtrl',
            bindToController: {
                onSubmit: '&',
                deviceData: '='
            },
            templateUrl: 'app/views/edit-add/edit-add.template.html'
        };
    }

    editAddController.$inject = [];
    function editAddController() {
        var editAddCtrl = this;

        editAddCtrl.showAttributes = false;
        editAddCtrl.attributeMessage = 'Click to show attributes';

        editAddCtrl.addAttributeSwitch = false;
        editAddCtrl.addAttributeMessage = 'Click to add an attribute';

        /**
         * Expands the attributes dropdown to show attribute functions
         */
        editAddCtrl.expandAttributes = function() {
            editAddCtrl.showAttributes = !editAddCtrl.showAttributes;
            editAddCtrl.attributeMessage = editAddCtrl.showAttributes ? 'Click to hide attributes' : 'Click to show attributes';
        };

        /**
         * Switches the view to the add attribute view
         */
        editAddCtrl.addAttributeView = function() {
            editAddCtrl.addAttributeSwitch = !editAddCtrl.addAttributeSwitch;
            editAddCtrl.addAttributeMessage =
                editAddCtrl.addAttributeSwitch ? 'click to cancel addition' : 'click to add an attribute';
        };

        /**
         * Adds an attribute to the attributes array
         * @param newAttribute -- the new attribute to add
         */
        editAddCtrl.addAttribute = function(newAttribute) {
            if (!editAddCtrl.deviceData.attributes) {
                editAddCtrl.deviceData.attributes = [];
            }
            editAddCtrl.deviceData.attributes.push(newAttribute);
        };
    }
})();
