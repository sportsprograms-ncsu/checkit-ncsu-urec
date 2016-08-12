/*
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 */

'use strict';
var auth = require('../services/authService.js');
var mongoose = require('mongoose'),
    User = mongoose.model('User');
var errors = require('../util/errors.js');

var _logger = null;

services.get('logger', function(logger) {
    _logger = logger;
});

/**
 * Checks if the user is authenticated.  Looking for the google access token
 * @param {string} refreshToken - Google refresh token.
 */
function isAuthenticated(req, res, next) {
    _logger.info('Checking user authentication');
    console.log(req.session.email);
    if (req.session.email) {
        return next();
    } else {
        return next(new errors.DefaultError(401, 'User not Authenticated!'));
    }
}
function isAdmin(req, res, next) {
    _logger.info('Checking user admininstration level');
    if(req.session.role > 0){
        return next();
    }else{
        return next(new errors.DefaultError(403, 'User not an Admin!'));
    }
}

function clearSession(req, res, next) {
    req.session = {};
}

exports.isAuthenticated = isAuthenticated;
exports.isAdmin = isAdmin;
exports.clearSession = clearSession;
