const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// model
const userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String
});

// encrypt pswd
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// creates model class
const users = mongoose.model('user', userSchema);

module.exports = users;
