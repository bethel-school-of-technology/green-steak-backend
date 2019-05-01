"use strict";
var mongoose = require("mongoose");

//schema and model
var Schema = mongoose.Schema;
var steakhouseSchema = new Schema({
  name: String,
  coordinates: {
    latitude: String,
    longitude: String
  }
});

var Steakhouses = mongoose.model("steakhouses", steakhouseSchema, "steakhouses");

//queries and logic
class steakhousesService {
  constructor() {}

  //find all steakhouses
  static findAll(callback) {
    Steakhouses.find({}, {name:1, coordinates:1}, function(err, steakhouses) {
      callback(null, steakhouses);
    });
  }

  //add steakhouses from maps API
  static addGoogleData(rawGoogleData, callback) {
    var googleData = JSON.parse(rawGoogleData.steakhouses)
    console.log(googleData.length + " steakhouses submitted to the database");
    Array.from(googleData).forEach(steakhouse => {
      var lat = steakhouse.coordinates.latitude;
      var long = steakhouse.coordinates.longitude;
      var steakhname = steakhouse.name;
      Steakhouses.findOne(
        {
          coordinates: {
            latitude: lat,
            longitude: long
          }
        },
        "name",
        function(err, existingData) {
          if (existingData === null) {
            var steakhouseToSave = new Steakhouses({
              name: steakhname,
              coordinates: {
                latitude: lat,
                longitude: long
              }
            });
            steakhouseToSave.save(function(err) {
              console.log(steakhname + " has been saved");
            });
            return;
          } else {
            console.log(existingData.name + " is already in the database");
            return;
          }
        }
      );
    });
    callback(null);
  }
};

exports.steakhousesService = steakhousesService;
