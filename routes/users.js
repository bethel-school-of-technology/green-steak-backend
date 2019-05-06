var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const passport = require("passport");
const connectEnsue = require("connect-ensure-login");
var usersService = require("../services/users").usersService;

router.post("/register", function(req, res, next) {
  var formdata = req.body;
  usersService.signup(formdata, function(err, result) {
    res.send(result);
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send({ message: info.message, user: { name: ''}});
      }
      if (user) {
        return res.send({
          message: info.message,
          user: { id: user._id, name: user.name }
        });
      }
    }
  )(req, res, next);
});

module.exports = router;
