var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
//import providers (they execute queries and perform logic)
var steakhousesProvider = require("../providers/steakhouses")
  .steakhousesProvider;

//routing (passes data from providers to the front-end)
router.get("/steakhouses", function(req, res, next) {
  steakhousesProvider.findAll(function(error, steakhouses) {
    res.send(JSON.stringify(steakhouses));
  });
});

router.post("/googlemapsapiupload", function(req, res, next) {
  var googleData = req.body;
  steakhousesProvider.addGoogleData(googleData, function(err) {
    res.send("success, saving in progress")
  });
});

module.exports = router;
