var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
//import providers (they execute queries and perform logic)
var steakhousesProvider = require("../providers/steakhouses")
  .steakhousesProvider;
var reviewsProvider = require("../providers/reviews").reviewsProvider;

//routing (passes data from providers to the front-end)
router.get("/steakhouses", function(req, res, next) {
  steakhousesProvider.findAll(function(err, steakhouses) {
    res.send(JSON.stringify(steakhouses));
  });
});

router.post("/googlemapsapiupload", function(req, res, next) {
  var googleData = req.body;
  steakhousesProvider.addGoogleData(googleData, function(err) {
    res.send("success, saving in progress");
  });
});

router.post("/submitreview", function(req, res, next) {
  var formData = req.body;
  reviewsProvider.submitReview(formData, function(err) {
    // res.send("review saved");
    res.send("review saved")
  });
});

module.exports = router;
