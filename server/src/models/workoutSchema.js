var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workoutSchema = new Schema({
    name: String,
  description:  String, // String is shorthand for {type: String}
  reps: Number,
  rounds: Number,
  date: String,
  edited:  String,
  completed: false
});

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout