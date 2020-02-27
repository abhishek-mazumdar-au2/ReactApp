const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

router.get('/', (req, res) => {
    User.find() 
        .then(allUsers => res.json(allUsers))
        .catch(err => res.status(400).json({"Error": err}))
    // res.json({"route": "No users yet."})
})

router.post('/signup', (req, res) => {
    // res.json(req.body)
    const {name, password, gender, country} = req.body;
    const newUser = new User({
        name, password, gender, country
    })
    newUser.save()
        .then(res.json(`${name} is now a registered user. Go to localhost:3000/users to check.`))
})



module.exports = router;