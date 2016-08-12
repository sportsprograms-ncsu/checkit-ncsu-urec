/**
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the definition for the onRun of the application.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .run(runBlock);

    runBlock.$inject = [
        '$rootScope',
        '$state',
        '$timeout',
        '$document',
        'UtilService',
        'AuthService',
        'snapRemote',
        'ModalService'
    ];

    function runBlock($rootScope, $state, $timeout, $document, UtilService, AuthService, snapRemote, ModalService) {

        $document.foundation();

        var stateChangeErrorEvent = $rootScope.$on('$stateChangeError', function(event, toState, toParams,
            fromState, fromParams, error) {

            UtilService.logError('', 'State Change ERROR:', angular.toJson(error));
        });

        var stateChangeSuccess = $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
            // Stores the previous state
            $rootScope.$previousState = fromState;
        });

        //Checking for authentication requirements and for scanner close (details page)
        var stateChangeStart = $rootScope.$on('$stateChangeStart', function(event, toState) {

            var authenticated = sessionStorage.getItem('isAuthenticated') === 'true';

            //home/list/details require auth. If not auth'd, prevent and go to signin.
            if (toState.data.requiresAuthentication && !authenticated) {
                event.preventDefault(); //prevent this nav
                $rootScope.navigateBack('signin'); //go to sign in
            }
            //sign in doesn't require auth, if auth'd, prevent and go to home page.
            else if (!(toState.data.requiresAuthentication) && authenticated) {
                event.preventDefault(); //prevent this nav
                $rootScope.navigate('home'); //go to home page
            }
        });

        //Slide Transition Methods

        //This navigate function transitions states forward (a left transition)
        $rootScope.navigate = function(state, params, options) {
            _setNavLeft();
            $timeout(function() {
                $state.go(state, params, options);
                _setNavRight();
            }, 0);
        };

        //This navigate function transitions states backward (a right transition)
        $rootScope.navigateBack = function(state, params) {
            _setNavRight();
            $timeout(function() {
                $state.go(state, params);
                _setNavLeft();

            }, 0);
        };

        //This function uses the history to transition back
        $rootScope.back = function() {
            ModalService.closeAll();
            _setNavRight();
            $timeout(function() {
                if ($state.current.name !== 'home') {
                    history.back();
                }
                _setNavLeft();
            }, 0);
        };

        var _setNavLeft = function() {
            $rootScope.AppSlide = 'slideInLeft slideOutRight';
        };

        var _setNavRight = function() {
            $rootScope.AppSlide = 'slideInRight slideOutLeft';
        };

        $rootScope.getAppSlide = function() {
            return $rootScope.AppSlide;
        };

        // Sets navigation direction to left to handle slide from signin to home page
        _setNavLeft();

        $rootScope.slideTransitionDuration = 250;

        $rootScope.$on('$destroy', function() {
            //unsubscribe from the events
            stateChangeErrorEvent();
            stateChangeSuccess();
            stateChangeStart();
        });

        /**
         *
         * This is used to control the slide cover, which covers up the content
         * area of the app when the side menu is opened, so that clicking on
         * the content to close the drawer doesn't also take actions or navigate.
         *
         */
        $rootScope.snapperOpened = false;
        snapRemote.getSnapper().then(function(snapper) {
            snapper.enable();

            snapper.on('animated', function() {
                $timeout(function() {
                    var state = snapper.state();
                    if (state.state === 'closed') {
                        $rootScope.snapperOpened = false;
                    } else {
                        $rootScope.snapperOpened = true;
                    }
                }, 50);
            });

        });

        /**
         * Function that sets the errmessage variable displayed in the error modal.
         * @param err - message to display in the error modal
         */
        $rootScope.errorModalText = function(err) {
            $rootScope.err = err;
        };

        //Stuff to do on device ready
        AuthService.init().then(function(msg) {
            UtilService.logInfo('', 'Loaded Google Auth:', msg);
            ModalService.compile();
            $document[0].addEventListener('deviceready', onDeviceReady, false);
            // for dev purposes
            UtilService.logInfo('', '', 'Welcome to checkit');
        }, function(err) {
            UtilService.logError('', 'AppRun', err);
        });


        function onDeviceReady() {
            UtilService.logInfo('', '', 'Foundation Initialized');


            //Attach Fastclick
            //FastClick.attach(document.body);
            UtilService.logInfo('', '', 'Fast Click attached!');
            AuthService.silentLogin().then(function() {
                //Logged in, so let's nav home
                $rootScope.navigate('home');

            }, function() {
                //not logged in, so let's notify the sign in page
                $rootScope.$broadcast('not signed in');
            });
        }
    }
})();
