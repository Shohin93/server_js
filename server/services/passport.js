const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// create local strategy
const localLogin = new LocalStrategy(
  {usernameField: 'email'},
  function(email, password, done) {
    User.findOne({email: email}, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }

      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false);
        }

        return done(null, user); 
      });
    });
  }
);

// options for jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // payload = userid + timestamp
  // check if the user id exists in db
  // if does => done(null, user)
  // else done(null, user)
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false)
    }

    if (user) {
      done(null, user); // null => no error
    } else {
      done(null, false);
    }
  });
});

// tell passport to use the following strategies
passport.use(localLogin);
passport.use(jwtLogin);
