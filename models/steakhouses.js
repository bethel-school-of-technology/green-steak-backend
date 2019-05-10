"use strict";
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var steakhouseSchema = new Schema({
  name: String,
  coordinates: {
    latitude: String,
    longitude: String
  },
  address: String
});

var Steakhouses = mongoose.model("steakhouse", steakhouseSchema);

module.exports = Steakhouses