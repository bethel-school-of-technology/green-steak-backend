var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//import providers (they execute queries and perform logic)
var steakhousesProvider = require('../providers/steakhouses').steakhousesProvider

//routing (passes data from providers to the front-end)
router.get('/steakhouses', function(req, res, next) {
  steakhousesProvider.findAll(function(error, steakhouses){
    res.send(JSON.stringify(
      steakhouses
    ));
  });
})

router.post('/googlemapsapiupload', function(req, res, next) {
  var googleData = {
    //figure out how to pass data from api to backend, and how to format it (loop?)
  }

  steakhousesProvider.addGoogleData(googleData, function(err, dataAmountAdded) {
    console.log(dataAmountAdded.n + " data has been submitted, " + dataAmountAdded.nModified + " data has been saved.");
  })
})

module.exports = router;
