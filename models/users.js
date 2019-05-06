"use strict";
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: String,
    name: String,
    password: String
});

var Users = mongoose.model("user", userSchema);

module.exports = Users;