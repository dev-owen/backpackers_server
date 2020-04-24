"use strict";

// const config = require('../configs/configs');
const serviceLocator = require("../lib/service_locator");
const mongoose = serviceLocator.get("mongoose");

// Spot Schema
const spotSchema = new mongoose.Schema(
  {
    spotname: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    country: {
      type: String,
      required: true,
    },
    city_region: {
      type: String,
      required: true,
    },
    star_rate: {
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

module.exports = mongoose.model("Spots", spotSchema);
