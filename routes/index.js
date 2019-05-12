var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var steakhousesService = require("../services/steakhouses");
var reviewsService = require("../services/reviews");
const passport = require("passport");


router.get("/steakhouses", function(req, res, next) {
  steakhousesService.findAll(function(err, steakhouses) {
    res.send(JSON.stringify(steakhouses));
  });
});

router.post("/reviews/submit", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    reviewsService.submitReview(req.body, user, function(err) {
      res.send({ message: "review saved" });
    });
  })(req, res, next);
});

router.get("/reviews/recent/:id?", function(req, res, next) {
  var steakhouse = req.params;
  reviewsService.findRecent(steakhouse, function(err, mostRecent) {
    res.send(JSON.stringify(mostRecent));
  });
});

module.exports = router;
