"use strict";
var mongoose = require("mongoose");
var Reviews = require("../models/reviews");
var Steakhouses = require("../models/steakhouses")

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
        {identifier: 0},
        { sort: { "meta.timestamp": -1 } },
        function(err, mostRecent) {
          var reviews = mostRecent
          // console.log(reviews)
          return reviews
        }
      ).then((reviews) => {
        Steakhouses.findOne(
          {_id: steakhouse.id},
          {name: 1, address: 1},
          function(err, steakhouseInfo) {
            var steakhouse = steakhouseInfo
            callback(null, reviews, steakhouse)
          }
        )
      })
      return
    }
    console.log("no filter")
    Reviews.find(
      {},
      null,
      { sort: { "meta.timestamp": -1 }, limit: 10},
      function(err, mostRecent) {
        callback(null, mostRecent, null);
      }
    );
  }
}

module.exports = reviewsService;
