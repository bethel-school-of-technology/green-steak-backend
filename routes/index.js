var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var steakhousesService = require("../services/steakhouses")
  .steakhousesService;
var reviewsService = require("../services/reviews").reviewsService;

router.get("/steakhouses", function(req, res, next) {
  steakhousesService.findAll(function(err, steakhouses) {
    res.send(JSON.stringify(steakhouses));
  });
});

router.post("/submitreview", function(req, res, next) {
  var formData = req.body;
  reviewsService.submitReview(formData, function(err) {
    res.send("review saved")
  });
});

module.exports = router;
