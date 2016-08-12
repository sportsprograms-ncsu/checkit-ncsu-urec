/*
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 */

var errors = require('../util/errors.js');

module.exports.init = function(app, logger) {
    logger.info('Loaded error handler.');
    app.use(errors.errorHandler);
};
