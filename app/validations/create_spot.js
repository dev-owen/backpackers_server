"use strict";

const joi = require("joi");

module.exports = joi
  .object()
  .keys({
    spotname: joi.string().required(),
    country: joi.string().required(),
    city_region: joi.string().required(),
    star_rate: joi.number().required(),
    description: joi.string().required(),
  })
  .required();
