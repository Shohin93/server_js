const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function userToken(user) {
  console.log(user)
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send("You must provide email or password!");
  }

  User.findOne({email: email}, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({error: "Email is already in use!"});
    }

    const user = new User({
      email: email,
      password: password
    });
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      // respond to req that user has been created
      res.json({token: userToken(user)});
    })
  });
}

exports.signin = function(req, res, next) {
  // Just give a user token
  res.send({token: userToken(req.user)});
}
