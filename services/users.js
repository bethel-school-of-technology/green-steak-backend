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

  static login(rawLoginFormData, callback) {
    var loginFormData = JSON.parse(rawLoginFormData.data);
    Users.findOne(
      {
        email: loginFormData.email
      },
      { password: 1, email: 1 },
      function(err, account) {
        if (account === null) {
          var result = "Email not registered";
          callback(null, result);
          return;
        } else if (
          account.password === loginFormData.password &&
          account.email === loginFormData.email
        ) {
          var result = "login success";
          callback(null, result);
          return;
        } else if (
          account.password != loginFormData.password &&
          account.email === loginFormData.email
        ) {
          var result = "incorrect password";
          callback(null, result);
          return;
        } else {
          var result = "authentication error";
          callback(null, result);
          return;
        }
      }
    );
  }
}

exports.usersService = usersService;
