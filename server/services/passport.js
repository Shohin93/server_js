const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

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

passport.use(jwtLogin);
