var express = require("express");
var router = express.Router();
var steakhousesService = require("../services/steakhouses");
var reviewsService = require("../services/reviews");
const passport = require("passport");

router.get("/steakhouses", function(req, res, next) {
  steakhousesService.findAll(function(err, steakhouses) {
    if (err) {
      return next(err);
    } else {
      res.send(JSON.stringify(steakhouses));
    }
  });
});

router.post("/reviews/submit", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (info) {
      res.send({ message: info.message });
    } else {
      reviewsService.submitReview(req.body, user, function(err, prob) {
        if (err) {
          return next(err);
        }
        if (prob) {
          res.send({ message: prob });
        } else {
          res.send({ message: "review saved" });
        }
      });
    }
  })(req, res, next);
});

router.get("/reviews/recent/:id?", function(req, res, next) {
  var steakhouse = req.params;
  reviewsService.findRecent(steakhouse, function(
    err,
    prob,
    mostRecent,
    steakhouse
  ) {
    if (err) {
      next(err);
    }
    if (prob) {
      res.send({
        message: prob
      });
    } else {
      res.send({
        review: mostRecent,
        steakhouse: steakhouse
      });
    }
  });
});

module.exports = router;
