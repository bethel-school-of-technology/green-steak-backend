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

var Steakhouses = mongoose.model("steakhouses", steakhouseSchema);

//queries and logic
class steakhousesProvider {
  constructor() {}

  //find all steakhouses
  static findAll(callback) {
    Steakhouses.find({}, "name", function(err, steakhouses) {
      callback(null, steakhouses);
    });
  }

  //add steakhouses from maps API
  static addGoogleData(googleData, callback) {
    console.log(googleData.length + " steakhouses submitted to the database");
    for (var i = 0; i < googleData.length; i++) {
      var lat = googleData[i].coordinates.latitude;
      var long = googleData[i].coordinates.longitude;
      var steakhname = googleData[i].name;
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
    }
    callback(null);
  }
}

exports.steakhousesProvider = steakhousesProvider;
