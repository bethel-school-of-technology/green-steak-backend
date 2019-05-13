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

  static submitReview(formData, user, callback) {
    var identifier = formData.identifier;
    var commentText = formData.comment;
    var user = user._id;
    var value = formData.ratePrice;
    var quality = formData.rateQuality;
    var now = this.createTimestamp();
    var reviewToSubmit = new Reviews({
      identifier: identifier,
      comment: commentText,
      user: user,
      value: value,
      quality: quality,
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
    console.log(steakhouse)
    if (steakhouse.id !== undefined) {
      console.log("filtered");
      Reviews.find(
        {identifier: steakhouse.id},
        null,
        { sort: { "meta.timestamp": -1 } },
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
      { sort: { "meta.timestamp": -1 }, limit: 10},
      function(err, mostRecent) {
        callback(null, mostRecent);
      }
    );
  }
}

module.exports = reviewsService;
