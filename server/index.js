/**
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 *
 * Starts the server
 */

var server = require('blueoak-server');

//All models are instantiated here
require('./models/asset.schema');
require('./models/user.schema');
require('./models/record.schema');

server.init(function(err) {
    if (err) {
        console.warn('Startup failed', err);
    } else {
        console.log('Server has successfully started!');

        //At this point we could safely control the server through the server object
    }

});
