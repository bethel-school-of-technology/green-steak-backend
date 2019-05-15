"use strict";
var mongoose = require("mongoose");
var Reviews = require("../models/reviews");
var Steakhouses = require("../models/steakhouses");

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
    if (steakhouse.id !== undefined) {
      Steakhouses.findOne(
        { _id: steakhouse.id },
        { name: 1, address: 1 }
      ).then((steakhouse) => { 
        if (!steakhouse) {
          callback(
            null,
            "Invalid Steakhouse, please reselect a steakhouse and try again."
          );
        } else {
        Reviews.find(
          { identifier: steakhouse.id },
          { identifier: 0 },
          { sort: { "meta.timestamp": -1 } }
        )
          .populate({
            path: "user",
            select: "name"
          })
          .then((reviews) => {
            callback(null, reviews, steakhouse);
          })
        }
      })
    } else {
    Reviews.find(
      {},
      null,
      { sort: { "meta.timestamp": -1 }, limit: 10 }
    )
      .populate({
        path: "identifier",
        select: "name"
      })
      .populate({
        path: "user",
        select: "name"
      })
      .then(mostRecent => callback(null, mostRecent, null));
  }}
}

module.exports = reviewsService;
