var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
  password: String,
  gender: String,
  country: String
});

const User = mongoose.model('User', userSchema)

module.exports = User