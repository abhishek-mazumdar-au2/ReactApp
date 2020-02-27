const express = require('express');
const router = express.Router();
const Workout = require('../models/workoutSchema');
//GET
router.get('/', (req, res) => {
    Workout.find()
        .then(allWorkouts => res.json(allWorkouts))
})

//POST
 router.post('/newWorkout', (req, res) => {
     const { name, description, reps, rounds } = req.body;
     const newWorkout = new Workout({ name,
         description, reps, rounds, date: new Date()
     });
     newWorkout.save()
        .then(res.json('New Workout added! Check on localhost:3000/workouts/'))
 })

 // GET by ID
 router.get('/:id', (req, res) => {
     const { id } = req.params;
     Workout.findById(id)
        .then(result => {res.json(result)})
        .catch(err => res.status(404).json({"Error": err}))
 })

 // DELETE by ID
 router.get('/delete/:id', (req, res) => {
     const { id } = req.params;
     Workout.findByIdAndDelete(id)
        .then(response => res.json({"Msg": "Deleted!"}))
        .catch(err => res.status(400).json({"Error": err}))
 })

 // EDIT
 router.post('/update/:id', (req, res) => {
     const { id } = req.params;
     const { description, reps, rounds } = req.body;
     const updatedWorkout = new Workout({description, reps, rounds})
     Workout.findById(id)
        .then(workout => {
            workout.name = req.body.name,
            workout.description = req.body.description,
            workout.reps = req.body.reps,
            workout.rounds = req.body.rounds,
            workout.edited = new Date() 
            workout.save()
                .then(res.json({"Msg": "Workout updated!"}))
        })
     })
 


module.exports = router;