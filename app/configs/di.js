'use strict';

const serviceLocator = require('../lib/service_locator');
const config = require('./configs')();

serviceLocator.register('logger', () => {
    return require('../lib/logger').create(config.application_logging);
});

serviceLocator.register('httpStatus', () => {
    return require('http-status');
});

serviceLocator.register('mongoose', () => {
    return require('mongoose');
});

serviceLocator.register('errs', () => {
    return require('restify-errors');
});

serviceLocator.register('userService', (serviceLocator) => {
    const log = serviceLocator.get('logger');
    const mongoose = serviceLocator.get('mongoose');
    const httpStatus = serviceLocator.get('httpStatus');
    const errs = serviceLocator.get('errs');
    const UserService = require('../services/user');

    return new UserService(log, mongoose, httpStatus, errs);
});

serviceLocator.register('userController', (serviceLocator) => {
    const log = serviceLocator.get('logger');
    const httpStatus = serviceLocator.get('httpStatus');
    const userService = serviceLocator.get('userService');
    const UserController = require('../controllers/user');

    return new UserController(log, userService, httpStatus);
});

serviceLocator.register('spotService', (serviceLocator) => {
    const log = serviceLocator.get('logger');
    const mongoose = serviceLocator.get('mongoose');
    const httpStatus = serviceLocator.get('httpStatus');
    const errs = serviceLocator.get('errs');
    const SpotService = require('../services/spot');

    return new SpotService(log, mongoose, httpStatus, errs);
});

serviceLocator.register('spotController', (serviceLocator) => {
    const log = serviceLocator.get('logger');
    const httpStatus = serviceLocator.get('httpStatus');
    const spotService = serviceLocator.get('spotService');
    const SpotController = require('../controllers/spot');

    return new SpotController(log, spotService, httpStatus);
});

module.exports = serviceLocator;
