/*
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 */

'use strict';
var mongoose = require('mongoose'),
    db,
    GridFS;
var Grid = require('gridfs-stream'); // used to store and get the asset's image


exports.init = function(app, config, logger) {

    var uri = ['mongodb://', config.get('mongodb').username, ':', config.get('mongodb').pwd, '@',
        config.get('mongodb').host, ':', config.get('mongodb').port, '/', config.get('mongodb').db
    ].join('');
    if (config.get('mongodb').isTestDB) {
        uri = 'mongodb://localhost';
    } else if (config.get('mongodb').isQADB){
        logger.info('Connecting to the qa database. Changes here matter slightly.' + uri);
    } else {
        logger.warn('Connecting to the production database. Changes here matter.' + uri);
    }

    db = mongoose.connect(uri, function(err) {
        if (err) {
            logger.error('Could not connect to DB.');
            logger.error(err);
        } else {
            logger.info('Successfully connected to database: ' + uri);

        }
    });

    db.connection.on('error', function(err) {
        logger.error('DB connection error: ' + err);
        process.exit(-1);
    });
/*
    app.use(function(req, res, next) {
        req.gridfs = Grid(mongoose.connection.db, mongoose.mongo);
        req.db = db;
        next();
    });*/

};
