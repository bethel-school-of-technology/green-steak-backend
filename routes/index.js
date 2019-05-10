var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var steakhousesService = require("../services/steakhouses");
var reviewsService = require("../services/reviews");

router.get("/steakhouses", function(req, res, next) {
  steakhousesService.findAll(function(err, steakhouses) {
    res.send(JSON.stringify(steakhouses));
  });
});

router.post("/reviews/submit", function(req, res, next) {
  reviewsService.submitReview(req.body, function(err) {
    res.send("review saved")
  });
});

router.get("/reviews/recent/:id?", function(req, res, next) {
  var steakhouse = req.params
  reviewsService.findRecent(steakhouse, function(err, mostRecent) {
    res.send(JSON.stringify(mostRecent))
  })
})

module.exports = router;
