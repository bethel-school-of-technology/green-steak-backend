"use strict";
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    name: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);
var Users = mongoose.model("users", userSchema, "users");

module.exports = Users;