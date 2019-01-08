const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// model
const userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String
});

// creates model class
const users = mongoose.model('user', userSchema);

module.exports = users;