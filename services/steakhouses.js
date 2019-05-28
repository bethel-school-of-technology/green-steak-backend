"use strict";
var Steakhouses = require("../models/steakhouses");

class steakhousesService {
  constructor() {}

  static findAll(callback) {
    Steakhouses.find({}, function(err, steakhouses) {
      callback(null, steakhouses);
    });
  }

};

module.exports = steakhousesService