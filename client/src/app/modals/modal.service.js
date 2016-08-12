/*
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * Service for compiling and injecting foundation for site modals
 *
 * For any modal that needs to use dynamic data:
 *
 * 		Add the modal template to the template html used by the controller.
 *   	(Ei. if your controller is home.controller.js put the modal template into home.html)
 *   	Then add a timeout function with no delay in your controller or directive function
 *   	Inside this timeout setup the ModalService.add() function
 *   	Example:
 *   	$timeout(function() {
 *          //DOM has finished rendering
 *          ModalService.add('[theIdReferencingYourModalTemplate]');
 *      });
 */

(function() {
    'use strict';

    angular
        .module('app.services')
        .service('ModalService', ModalService);

    ModalService.$inject = [
        '$document',
        '$timeout',
        '$compile',
        '$rootScope',
        '$templateCache',
        '$http',
        'UtilService',
        'Foundation'
    ];

    /*
     * @ngdoc service
     * @name ModalService
     * @description
     * Defines the ModalService
     * @param {object} $document
     * @param {object} $timeout
     * @param {object} $compile
     * @param {object} $rootScope
     * @param {object} $templateCache
     * @param {object} $http
     * @param {object} UtilService
     * @param {object} Foudation
     * @constructor
     */

    function ModalService($document, $timeout, $compile, $rootScope, $templateCache, $http, UtilService, Foundation) {
        var templateUrl = 'app/modals/modals.template.html';
        var self = this;
        self.modals = {};

        /*
         * Function that runs once on startup. It registers the provided modals with foundation for sites.
         * Modals must contain the class '.reveal'
         */
        self.compile = function() {
            $http.get(templateUrl, { cache: $templateCache })
                .then(function(response) {
                    var body = $document.find('body').eq(0);
                    body.append(response.data);

                    UtilService.logInfo('App.run', 'ModalService', 'Modals compiled.');
                    $timeout(function() {
                        var foundationModals = $document.find('.reveal'); //finds all foundation modals
                        for (var i = 0; i < foundationModals.length; i++) {
                            var modal = $document.find('#' + foundationModals[i].id);
                            self.modals[foundationModals[i].id] = new Foundation.Reveal(modal);
                            if (foundationModals[i].id === 'errorModal') {
                                $compile(modal.html())($rootScope);
                            }
                        }
                    });
                });
        };

        /**
         * Function that closes all foundation modals
         */
        self.closeAll = function() {
            var foundationModals = $document.find('.reveal'); //finds all foundation modals
            for (var i = 0; i < foundationModals.length; i++) {
                var modal = self.modals[foundationModals[i].id];
                modal.close();
            }
        }

        /**
         * Function for returning a foundation modal
         * @returns {object} -> the modal object
         */
        self.get = function(name) {

            if (angular.isUndefined(self.modals[name])) {
                UtilService.logError('', 'ModalService', 'Modal not found with name: ' + name + '. Try adding first.');
            } else {
                return self.modals[name];
            }
        };

        /**
         * Function for adding modals to the modals object and foundation for sites
         * @param id -> the modal's html id
         */
        self.add = function(id) {
            var modal = $document.find('#' + id);
            if (angular.isUndefined(self.modals[id])) { //Only add modals if they don't already exist
                if (modal) {
                    self.modals[id] = new Foundation.Reveal(modal);
                    UtilService.logInfo('', 'ModalService', 'Added modal, ' + id + '.');
                } else {
                    UtilService.logError('', 'ModalService', 'Modal not found with ID: ' + id);
                }
            }
        };
    }
})();
