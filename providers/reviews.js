"use strict";
var mongoose = require("mongoose");

//schema and model
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

var Reviews = mongoose.model("reviews", reviewSchema, "reviews");

//queries and logic
class reviewsProvider {
  static submitReview(formData, callback) {
    console.log("feature not yet built");
    callback(null);
  }
}

exports.reviewsProvider = reviewsProvider;
