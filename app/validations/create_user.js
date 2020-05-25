"use strict";

const joi = require("joi");

module.exports = joi
  .object()
  .keys({
    username: joi.string().alphanum().min(4).max(16).required(),
    password: joi.string().alphanum().min(8).max(20).required(),
    email: joi.string().required(),
    country: joi.string().required(),
    introduction: joi.string().max(200).required(),
  })
  .required();
