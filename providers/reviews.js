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
  static createTimestamp() {
    var today = new Date();
    var timestamp =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();
    return timestamp;
  }

  static submitReview(formData, callback) {
    var identifier = formData.identifier;
    var commentText = formData.comment;
    var user = formData.username;
    var ratingv = formData.value;
    var ratingq = formData.quality;
    var now = this.createTimestamp();
    var reviewToSubmit = new Reviews({
      identifier: {
        latitude: identifier.latitude,
        longitude: identifier.longitude
      },
      comment: commentText,
      username: user,
      value: ratingv,
      quality: ratingq,
      meta: {
        timestamp: now
      }
    });
    reviewToSubmit.save(function(err) {
      console.log("Review saved");
    });
    callback(null);
  }
}

exports.reviewsProvider = reviewsProvider;
