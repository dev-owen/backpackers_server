"use strict";

// const config = require('../configs/configs');
const serviceLocator = require("../lib/service_locator");
const mongoose = serviceLocator.get("mongoose");

// const spotSchema = new mongoose.Schema({
//   spotname: {
//     type: String,
//     trim: true,
//     required: true,
//     unique: true,
//     lowercase: true
//   }
// });

// User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      min: 4,
      max: 16
    },
    password: {
      type: String,
      trim: true,
      min: 8,
      max: 20
    },
    email: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    introduction: {
      type: String,
      required: true,
      max: 200
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Users", userSchema);
