var express = require("express");
var router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res, next) => {
  passport.authenticate("register", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.send({ message: info.message, name: "" });
    } else {
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
      });
      const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });
      return res.send({
        token: token,
        message: info.message,
        name: user.name
      });
    }
  })(req, res, next);
});

router.post("/login", (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send({ message: info.message, name: "" });
    }
    if (user) {
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
      });
      const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });
      return res.send({
        token: token,
        message: info.message,
        name: user.name
      });
    }
  })(req, res, next);
});

router.get("/ensure", (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (info) {
      res.send({ loggedIn: false});
    } else {
      res.send({ loggedIn: true });
    }
  })(req, res, next);
});

module.exports = router;
