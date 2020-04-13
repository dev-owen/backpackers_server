'use strict';

// const config = require('../configs/configs');
const serviceLocator = require('../lib/service_locator');
const mongoose = serviceLocator.get('mongoose');

// User Schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        introduction: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Users', userSchema);
