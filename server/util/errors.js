/*
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 */

'use strict';
var util = require('util');

var _logger = null;

services.get('logger', function(logger) {
    _logger = logger;
});


/**
 * Construct an error using the HTTP response that comes from request(...).
 *
 * @param response
 * @constructor
 */
function GoogleResponseError(response, body) {

    Error.call(this);
    Error.captureStackTrace(this, this.constructor);

    /*
    Google error format
    {
        'error': {
            'errors': [
                {
                    'domain': 'calendar',
                    'reason': 'timeRangeEmpty',
                    'message': 'The specified time range is empty.',
                    'locationType': 'parameter',
                    'location': 'timeMax'
                }
            ],
            'code': 400,
            'message': 'The specified time range is empty.'
        }
    }
    */
    this.message = '';

    // Set a message if we have it
    if (body && body.error && body.error.errors) {
        // Use the first one in the list
        for (var x = 0; x < body.error.errors.length; x++) {
            this.message = body.error.errors[x].message;
            break;
        }
    }

    this.statusCode = response.statusCode;
    this.name = this.constructor.name;
}

util.inherits(GoogleResponseError, Error);

function ValidationFailed(message) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
    this.statusCode = 400;
    this.name = this.constructor.name;
}

util.inherits(ValidationFailed, Error);

function MongooseError(err) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = 'Mongoose ' + err.name + ': ' + err.message;
    console.log(err.name);
    switch(err.name){
    case 'CastError':
        if(err.kind === 'ObjectId'){
            this.message = this.message + ' ID is in an invalid format for use by mongoose.';
        }
        this.statusCode = 400;
        break;
    case 'ValidationError':
        this.message = err.message + ': ' +  err;
        this.statusCode = 400;
        break;
    default:
        console.log(this.message);
        this.statusCode = 500;
    }
}

util.inherits(MongooseError, Error);

function DefaultError(status, message) {
    if(status > 399 && status < 500){ //Auth errors
        message = message + ": Authorization error!"
    }
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
    this.statusCode = status;
    this.name = this.constructor.name;
}

util.inherits(DefaultError, Error);

function errorHandler(err, req, res, next) {
    if (err) {
        if (err.name === 'GoogleResponseError' ||
            err.name === 'ValidationFailed' ||
            err.name === 'DefaultError' ||
            err.name === 'MongooseError') {
            var returnedError = {
                status: err.statusCode,
                message: err.message
            };
            _logger.error(err);
            return res.status(err.statusCode).json(returnedError);
        } else {
            _logger.error(err.stack);
            res.sendStatus(500);
        }
    } else {
        _logger.warn('No error found, but error handler invoked');
        return next();
    }
}

function getGoogleError(err, response, body) {

    // We can have a few types of errors.
    // Connection problems or google will return an error in the body.

    // If we already have an error return it
    if (err) {
        return err;
        // Check for a google error
    } else if (response != null && response.statusCode !== 200) {

        _logger.debug('Creating new google error', response.body);
        _logger.debug('Error body: ', {
            body: body
        });
        return new GoogleResponseError(response, body);
    } else {
        return null;
    }
}

exports.GoogleResponseError = GoogleResponseError;
exports.ValidationFailed = ValidationFailed;
exports.DefaultError = DefaultError;
exports.MongooseError = MongooseError;
exports.errorHandler = errorHandler;
exports.getGoogleError = getGoogleError;
