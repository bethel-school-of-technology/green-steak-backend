const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("../models/users");
var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 8;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  "register",
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true, session: false },
    function(req, email, password, done) {
      Users.findOne({
        email: email
      }).then(user => {
        if (user) {
          return done(null, false, { message: "Email already registered" });
        } else {
          bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
            var newAccount = new Users({
              email: email,
              name: req.body.name,
              password: hashedPassword
            });
            newAccount.save().then(user => {
              return done(null, user, { message: "Welcome " });
            });
          });
        }
      });
    }
  )
);

passport.use(
  "login",
  new LocalStrategy({ usernameField: "email", session: false}, function(
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
        } else {
          bcrypt.compare(password, user.password).then(response => {
            if (response !== true) {
              return done(null, false, {
                message: "Incorrect password"
              });
            }
            return done(null, user, { message: "Welcome back " });
          });
        }
      })
      .catch(err => {
        if (err) {
          console.log(err);
          return done(err);
        }
      });
  })
);

const jwtopts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  "jwt",
  new JWTstrategy(jwtopts, (jwt_payload, done) => {
    Users.findOne({
      email: jwt_payload.id
    }).then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  })
);

passport.serializeUser((user, callback) => {
  callback(null, user);
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
