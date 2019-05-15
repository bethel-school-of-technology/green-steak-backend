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
    if (
      formData.identifier &&
      formData.comment &&
      formData.ratePrice &&
      formData.rateQuality &&
      user
    ) {
      Steakhouses.findOne(
        {
          _id: formData.identifier
        },
        {
          _id: 1
        }
      ).then(steakhouseExists => {
        if (!steakhouseExists) {
          callback(
            null,
            "Invalid Steakhouse, please reselect a steakhouse and try again."
          );
        } else {
          var now = this.createTimestamp();
          var reviewToSubmit = new Reviews({
            identifier: formData.identifier,
            comment: formData.comment,
            user: user._id,
            value: formData.ratePrice,
            quality: formData.rateQuality,
            meta: {
              timestamp: now
            }
          });
          reviewToSubmit.save(function(err) {
            console.log("Review saved");
          });
          callback(null);
        }
      });
    } else {
      callback(null, "Missing fields.");
    }
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
