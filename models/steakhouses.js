"use strict";
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var steakhouseSchema = new Schema({
  name: String,
  coordinates: {
    latitude: String,
    longitude: String
  }
});

var Steakhouses = mongoose.model("steakhouses", steakhouseSchema, "steakhouses");

module.exports = Steakhouses