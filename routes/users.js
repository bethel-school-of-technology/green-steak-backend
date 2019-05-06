var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var usersService = require("../services/users").usersService;

router.post("/register", function(req, res, next) {
  var formdata = req.body;
  usersService.signup(formdata, function(err, result) {
    console.log(result);
    res.send(result);
  });
});

router.post("/login", function(req, res, next) {
  var formdata = req.body;
  usersService.login(formdata, function(err, result) {
    res.send(result);
  })
})

module.exports = router;