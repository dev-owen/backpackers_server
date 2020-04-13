'use strict';

// const config = require('../configs/configs');
const serviceLocator = require('../lib/service_locator');
const mongoose = serviceLocator.get('mongoose');

// User Schema
const spotSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
            lowercase: true,
        },
        country: {
            type: String,
            required: true,
        },
        cityRegion: {
            type: String,
            required: true,
        },
        starRate: {
            type: Number,
            required: true,
        },
        image: {},
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Spots', spotSchema);
