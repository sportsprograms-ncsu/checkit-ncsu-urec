/*
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 */

var auth = require('../util/authUtil.js');
var _app, _logger, _recordsService;

module.exports = {
    init: function(app, logger, recordsService) {
        _app = app;
        _logger = logger;
        _recordsService = recordsService;
    },
    getAssetRecords: function(req, res, next) {
        _logger.info('GETing from /api/v1/records/{assetID}');
        _recordsService.getAssetRecords(req.params.assetID, function(err, result) {
            if (err) {
                _logger.error(err);
                next(err);
            } else {
                res.status(200).send(result);
            }
        });
    }
};
