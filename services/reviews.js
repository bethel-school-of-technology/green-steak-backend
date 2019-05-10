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

  static submitReview(formData, callback) {
    var identifier = formData.identifier;
    var commentText = formData.comment;
    var user = formData.username;
    var ratingv = formData.value;
    var ratingq = formData.quality;
    var now = this.createTimestamp();
    var reviewToSubmit = new Reviews({
      identifier: identifier,
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

  static findRecent(steakhouse, callback) {
    if (steakhouse !== null) {
      console.log("filtered");
      Reviews.find(
        {identifier: steakhouse.id},
        null,
        { sort: { "meta.timestamp": -1 }, limit: 10 },
        function(err, mostRecent) {
          callback(null, mostRecent);
        }
      );
      return
    }
    console.log("no filter")
    Reviews.find(
      {},
      null,
      { sort: { "meta.timestamp": -1 }},
      function(err, mostRecent) {
        callback(null, mostRecent);
      }
    );
  }
}

module.exports = reviewsService;
