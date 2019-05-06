"use strict";
var mongoose = require("mongoose");
var Users = require("../models/users");

class usersService {
  static signup(signupFormData, callback) {
    console.log(signupFormData);
    Users.findOne(
      {
        email: signupFormData.email
      },
      "name",
      function(err, existingAccount) {
        if (!existingAccount) {
          var newAccount = new Users({
            email: signupFormData.email,
            name: signupFormData.name,
            password: signupFormData.password
          });
          newAccount.save().then(() => {
            callback(null, "User registered. Please log in.");
          });
          return;
        } else {
          callback(null, "Email already registered");
          return;
        }
      }
    );
  }

}

exports.usersService = usersService;
