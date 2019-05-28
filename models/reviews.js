"use strict";
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var reviewSchema = new Schema({
  identifier: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'steakhouse'
  },
  comment: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  value: Number,
  quality: Number,
  meta: {
    timestamp: Date
  }
});

var Reviews = mongoose.model("review", reviewSchema);

module.exports = Reviews;
