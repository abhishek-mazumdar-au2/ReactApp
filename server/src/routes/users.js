const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const bcryptjs = require('bcryptjs');

router.get('/', (req, res) => {
    User.find() 
        .then(allUsers => res.json(allUsers))
        .catch(err => res.status(400).json({"Error": err}))
    // res.json({"route": "No users yet."})
})

router.post('/signup', async (req, res) => {
    // res.json(req.body)
    const inDB = false;
    const { name, password, gender, country, email } = req.body;
    console.log(email);
        // 1. check if the user exists in the DB
        await User.find({email: email})
            .then(userWithTheEmail => {
                const userExist = userWithTheEmail
                console.log(userExist.length);
                if(userExist.length>0) {
                    res.json({"Msg": "Email already registered!"})
                    inDB = true
                }
        })
        if(inDB===false){
            console.log('User not in DB');
            const hashedPassword = await bcryptjs.hash(password, 10)
                console.log(hashedPassword);
                const newUser = new User({
                        name, password: hashedPassword, gender, country, email
                    }) 
                newUser.save()
                    .then(res.json(`${name} is now a registered user. Go to localhost:3000/users to check.`))
                    .catch(err => {res.json({"Error": err})}) 
        }
                                   
})

// login a user
router.post('/signin', async (req, res) => {
    try {
        const { email } = req.body;
    const userFromDB = await User.findOne({email: email})
    if(!userFromDB){
        res.json({"Msg":"No such User."})
    }
    const isMatch = await bcryptjs.compare(req.body.password, userFromDB.password)
     if(!isMatch) {
        res.json({"Msg": "Wrong Password."});
     }
     res.json({"Msg": "Loggedin!"})
    } catch (error) {
        res.json({"Error": error})
    }
    
})



module.exports = router;