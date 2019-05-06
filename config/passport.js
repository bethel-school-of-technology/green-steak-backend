const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("../models/users");
var mongoose = require("mongoose");

passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, function(
    email,
    password,
    done
  ) {
    Users.findOne({
      email: email
    })
      .then(user => {
        if (!user) {
          return done(null, false, {
            message: "Email not registered"
          });
        }
        if (user.password != password) {
          return done(null, false, {
            message: "Incorrect password"
          });
        }
        return done(null, user, { message: "Welcome " });
      })
      .catch(err => {
        if (err) {
          console.log(err);
          return done(err);
        }
      });
  })
);

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  Users.findOne({
    _id: id
  })
    .then(user => {
      callback(null, user);
    })
    .catch(err => {
      callback(err);
    });
});
