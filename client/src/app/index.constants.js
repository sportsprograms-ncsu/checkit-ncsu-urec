/**
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * This file holds the definition for the Constants of the application.
 */

/* global moment:false */
/* global Foundation:false */
(function() {
  'use strict';

  angular
    .module('app')
    .constant('moment', moment)
    .constant('Foundation', Foundation);

})();
