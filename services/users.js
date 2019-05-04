"use strict";
var mongoose = require("mongoose");
var Users = require("../models/users");

class usersService {
  static signup(rawSignupFormData, callback) {
    var signupFormData = JSON.parse(rawSignupFormData.data);
    Users.findOne(
      {
        email: signupFormData.email
      },
      "name",
      function(err, existingAccount) {
        if (existingAccount === null) {
          var newAccount = new Users({
            email: signupFormData.email,
            name: signupFormData.name,
            password: signupFormData.password
          });
          newAccount.save(function(err) {
            var result = "Registered";
            callback(null, result);
            return;
          });
          return result;
        } else {
          var result = "Email already registered";
          callback(null, result);
          return;
        }
      }
    );
  }
}

exports.usersService = usersService;
