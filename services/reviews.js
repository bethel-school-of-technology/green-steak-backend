"use strict";
var mongoose = require("mongoose");
var Reviews = require("../models/reviews");

class reviewsService {
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

  static submitReview(rawFormData, callback) {
    var formData = JSON.parse(rawFormData.review)
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

module.exports = reviewsService