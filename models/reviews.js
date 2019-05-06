"use strict";
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var reviewSchema = new Schema({
  identifier: {
    latitude: String,
    longitude: String
  },
  comment: String,
  username: String,
  value: Number,
  quality: Number,
  meta: {
    timestamp: Date
  }
});

var Reviews = mongoose.model("review", reviewSchema);

module.exports = Reviews