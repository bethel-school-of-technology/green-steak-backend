'use strict'
var mongoose = require('mongoose');

//schema and model
var Schema = mongoose.Schema
var steakhouseSchema = new Schema({
  name: String,
  coordinates: {
    latitude: String,
    longitude: String
  }
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

  //add steakhouses from maps API
  static addGoogleData(googleData, callback) {

    //spread the array of data here, assuming frontend passes an array of objects
    //recreate array (of objects) following schema

    for (i = 0; i < googleData.length; i++) {
      Steakhouses.updateOne(
        { coordinates: { latitude: googleData[i].coordinates.latitude, longitude: googleData[i].coordinates.longitude} },
        googleData[i],
        options.upsert=true,
        function (err, dataAmountAdded) {}
      )
    }
  }
}


exports.steakhousesProvider = steakhousesProvider