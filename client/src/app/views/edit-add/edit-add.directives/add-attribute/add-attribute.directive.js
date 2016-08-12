/**
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the definition for the AddAttribute directive.
 *
 * NOTE Attributes do not show up on an asset's detail page.
 * Attributes are meant to house more detailed information on an asset only availble by an admin.
 */


(function() {
    'use strict';

    angular
        .module('app.editAdd')
        .directive('addAttributes', AddAttributesDirective);

    AddAttributesDirective.$inject = [];

    /**
     * @ngdoc directive
     * @name AddAttributesDirective
     * @description
     * Function returning the add-attribute directive set up.
     * @returns {*} -> directive object as defined by AngularJS (https://docs.angularjs.org/guide/directive)
     *
     */
    function AddAttributesDirective() {

        return {
            restrict: 'E',
            replace: false,
            controller: AddAttributesController,
            controllerAs: 'addAttributesCtrl',
            bindToController: {
                addFn: '&'
            },
            templateUrl: 'app/views/edit-add/edit-add.directives/add-attribute/add-attribute.template.html'
        };
    }

    AddAttributesController.$inject = [];

    /**
     * @ngdoc function
     * @description
     * Controls the AddAttributesDirective directive
     * @constructor
     */
    function AddAttributesController() {
        var addAttributesCtrl = this;

        addAttributesCtrl.newTitle = {
            string: '',
            array: ''
        };

        addAttributesCtrl.newValue = {
            string: '',
            array: [],
            arrayValue: ''
        };

        addAttributesCtrl.attributeType = 'string';
        addAttributesCtrl.active = {
            'string': true,
            'list': false
        };

        /**
         * Toggles between a list attribute and a string attribute
         * @param  {string} attrType The type of attribute to change to.
         * Currently only type 'list' and 'string' are supported
         * @return {[type]}          [description]
         */
        addAttributesCtrl.changeAttributeType = function(attrType) {
            addAttributesCtrl.active[addAttributesCtrl.attributeType] = false;
            addAttributesCtrl.attributeType = attrType;
            addAttributesCtrl.active[attrType] = true;
        };
        /**
         * Used only by the list attribute. Pushes a new value to the list.
         */
        addAttributesCtrl.addToNewList = function() {
            addAttributesCtrl.newValue.array.push(addAttributesCtrl.newValue.arrayValue);
            addAttributesCtrl.newValue.arrayValue = '';
        };

        /**
         * Determines if the attribute list is empty.
         * This is used to disable the UI's 'Add Attribute' button.
         * So that an empty list attribute cannot be added.
         * @return {bool} False if the list is greater than one, true if the list is less than one.
         */
        addAttributesCtrl.noListItemsAdded = function() {
            return (addAttributesCtrl.newValue.array.length < 1);
        };

        /**
         * This function creates an attribute object,
         * calls the add attribute function of the parent controller,
         * and clears out the old attribute values.
         * @param {string} type The type of attribute added. Can be an array (list) or string
         */
        addAttributesCtrl.addAttribute = function(type) {
            var newAttribute = {
                key: addAttributesCtrl.newTitle[type],
                type: type,
                value: addAttributesCtrl.newValue[type]
            }
            addAttributesCtrl.addFn({ 'newAttribute': newAttribute });

            addAttributesCtrl.newTitle[type] = '';
            addAttributesCtrl.newValue[type] = (type === 'array') ? [] : '';
        };

    }
})();
