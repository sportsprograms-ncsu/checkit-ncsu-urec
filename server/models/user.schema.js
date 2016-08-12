/*
 * Copyright (c) 2015-2016 PointSource, LLC.
 * MIT Licensed
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var roles = [0, 1, 2];

/**
 * User Schema
 */
var Role = new Schema({
    role: {
        type: Number,
        enum: roles,
        required: true,
        default: 0,
    }
});

var Name = {
    first: {
        type: String,
        required: true,
        default: '',
    },
    last: {
        type: String,
        trim: true,
        required: true,
        default: ''
    }
};

var NotificationPrefs = {
    //TBD
};

var UserSchema = new Schema({
    name: Name,
    email: {
        type: String,
        trim: true,
        required: true,
        default: ''
    },
    phone: { //Used eventually for push notifications
        type: String,
        required: true,
        default: ''
    },
    notificationPrefs: NotificationPrefs,
    role: {
        type: Number,
        enum: roles,
        required: true,
        default: 0,
    },
    created: {
        type: Date,
        default: Date.now,
        required: true
    },
    updated: {
        type: Date,
        required: true,
        default: Date.now
    }
});

UserSchema.pre('save', function(next) {
    if (!this.isModified('updated')) {
        this.updated = new Date();
    }
    next();
});

UserSchema.static('returnBorrower', function(id, callback) {
    this.findOne({
        '_id': id
    }, function(err, user) {
        var borrower = {
            name: user.name,
            id: id
        };
        return callback(err, borrower);
    });
});

UserSchema.static('exists', function(email, callback) {
    this.findOne({
        'email': email
    }, {
        '_id': 1
    }, function(err, user) {
        if(!user){
            return callback(err, false);
        } else {
            return callback(err, true);
        }
    });
});

mongoose.model('User', UserSchema);
