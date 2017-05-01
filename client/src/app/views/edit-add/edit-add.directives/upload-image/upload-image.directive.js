/**
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the definition for the UploadImageDirective directive.
 */

(function() {
    'use strict';

    angular
        .module('app.editAdd')
        .directive('uploadImage', UploadImageDirective);

    UploadImageDirective.$inject = [];

    /**
     * This function returns the directive set up.
     * @returns {*} Directive object as defined by AngularJS
     */
    function UploadImageDirective() {

        return {
            restrict: 'E',
            replace: false,
            controller: UploadImageController,
            controllerAs: 'uploadImgCtrl',
            bindToController: {
                image: '=',
                exceededSize: '=',
                type: '='
            },
            templateUrl: 'app/views/edit-add/edit-add.directives/upload-image/upload-image.template.html'
        };
    }

    UploadImageController.$inject = [];

    /**
     * @ngdoc function
     * @description
     * Controls the UploadImageDirective directive
     * @constructor
     */
    function UploadImageController() {
        var uploadImgCtrl = this;

        if (uploadImgCtrl.image === '' || !uploadImgCtrl.image) {
            var imgUrl;
            switch (uploadImgCtrl.type) {
                case 'tablet':
                    imgUrl = 'assets/images/tablet_40x45.svg';
                    break;
                case 'radio':
                    imgUrl = 'assets/images/radio_32x40.svg';
                    break;
                case 'key':
                    imgUrl = 'assets/images/key_30x30.svg';
                    break;
                case 'mifi':
                    imgUrl = 'assets/images/wifi_checkit-green.svg';
                    break;
                case 'misc':
                    imgUrl = 'assets/images/circle-thin-checkit-green.svg';
                    break;
                default:
                    imgUrl = 'assets/images/circle-thin-checkit-green.svg';
            }
            uploadImgCtrl.altImage = imgUrl;
            uploadImgCtrl.imageLoaded = true;
        }


        /**
         * Updates the image on the client first so the <img> tag's src attribute is updated
         * @param  {object} file The image file
         */
        uploadImgCtrl.updateImage = function(file) {
            if (file) {
                uploadImgCtrl.imageLoaded = false;
                uploadImgCtrl.image = file;
            }
        };

        /**
         * Called once the image has loaded from the server.
         * Used to display a loader spinner while the image loads.
         */
        uploadImgCtrl.onImageLoad = function() {
            uploadImgCtrl.imageLoaded = true;
        };
    }
})();
