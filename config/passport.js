const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 8;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const passwordSecure = /(^(?=.*[A-Z])(?=.*[a-z])(?=.*[1-9])(?=.*[.!#$%&’*+/=?^_])[1-9A-Za-z.!#$%&’*+/=?^_]{6,18}$)/;
const emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameValid = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

passport.use(
  "register",
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true, session: false },
    function(req, email, password, done) {
      Users.findOne({
        email: email
      })
        .then(user => {
          if (user) {
            return done(null, false, { message: "Email already registered" });
          } else {
            if (nameValid.test(req.body.name) == false) {
              return done(null, false, { message: "Name is not valid" });
            }
            if (passwordSecure.test(password) == false) {
              return done(null, false, {
                message:
                  "Password must be between 6-18 characters and contain at least 1 of each of the following: a capital letter, a lowercase letter, a number, and a special character"
              });
            }
            if (emailValid.test(email) == false) {
              return done(null, false, { message: "Email is not valid" });
            } else {
              bcrypt
                .hash(password, BCRYPT_SALT_ROUNDS)
                .then(hashedPassword => {
                  var newAccount = new Users({
                    email: email,
                    name: req.body.name,
                    password: hashedPassword
                  });
                  newAccount
                    .save()
                    .then(user => {
                      return done(null, user, { message: "Welcome " });
                    })
                    .catch(err => {
                      if (err) {
                        return done(err);
                      }
                    });
                })
                .catch(err => {
                  if (err) {
                    return done(err);
                  }
                });
            }
          }
        })
        .catch(err => {
          if (err) {
            return done(err);
          }
        });
    }
  )
);

passport.use(
  "login",
  new LocalStrategy({ usernameField: "email", session: false }, function(
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
          bcrypt
            .compare(password, user.password)
            .then(response => {
              if (response !== true) {
                return done(null, false, {
                  message: "Incorrect password"
                });
              }
              return done(null, user, { message: "Welcome back " });
            })
            .catch(err => {
              if (err) {
                return done(err);
              }
            });
        }
      })
      .catch(err => {
        if (err) {
          return done(err);
        }
      });
  })
);

const jwtopts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  "jwt",
  new JWTstrategy(jwtopts, (jwt_payload, done) => {
    Users.findOne({
      email: jwt_payload.id
    })
      .then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch(err => {
        if (err) {
          return done(err);
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
