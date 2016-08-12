/*
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 */

var auth = require('../util/authUtil.js');
//Can use this for non swagger handlers
module.exports.init = function(app, logger) {
    logger.info('Loaded authenticate handler.');
    app.use(auth.isAuthenticated);
};
