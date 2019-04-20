'use strict'
var mongoose = require('mongoose');

//schema and model
var Schema = mongoose.Schema
var steakhouseSchema = new Schema({
  id: Number,
  name: String
})

var Steakhouses = mongoose.model('steakhouses', steakhouseSchema)

//queries and logic
class steakhousesProvider {
  constructor() { }

  //find all steakhouses
  static findAll(callback) {
    Steakhouses.find({}, function (err, steakhouses) {
      callback(null, steakhouses);
    });
  }
}


exports.steakhousesProvider = steakhousesProvider