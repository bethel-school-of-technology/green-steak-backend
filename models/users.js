"use strict";
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: String,
    name: String,
    password: String
});

// userSchema.plugin(passportLocalMongoose);
var Users = mongoose.model("user", userSchema);

module.exports = Users;