var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-type-email');

var userSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
  email: mongoose.SchemaTypes.Email,
  password: String,
  gender: String,
  country: String
});

const User = mongoose.model('User', userSchema)

module.exports = User