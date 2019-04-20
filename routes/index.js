var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var Schema = mongoose.Schema
var steakhouseSchema = new Schema({
  id: Number,
  name: String
})

var Steakhouses = mongoose.model('steakhouses', steakhouseSchema)

router.get('/steakhouses', function(req, res, next) {
  Steakhouses.find(
    {}
  ).then(steakhousesFound => {
    res.send(JSON.stringify(
      steakhousesFound
    ));
  });
})

module.exports = router;
