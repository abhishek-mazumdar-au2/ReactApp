const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');


const userSchema = require('./models/userSchema')

const mongoose = require('mongoose');
const uri =  process.env.MONGODB_URI || "mongodb://localhost:27017/workout-tracker-app";
const connection = mongoose.connection;
connection.once('open', () => {console.log('Connected to the MongoDB');})
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.json())  // For body parsing
app.use(cors());        // To talk to other servers
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({"msg": "Hey from the server!" })
})

const userRoute = require('./routes/users')
const workoutRoute = require('./routes/workouts')
app.use('/users', userRoute)
app.use('/workouts', workoutRoute)

const port = 3000 || process.env.PORT;
app.listen(port, () => {console.log(`PORT=${port} Listening`)})