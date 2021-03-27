const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({
            error: "Enter Email and Password"
        });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).send({
            error: "User already exists"
        })
    }

    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'MYSECRETKEY');

    res.send({ token });
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({
            error: "Enter Email and Password"
        });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
            error: "Invalid Email or Password"
        })
    }

    user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) return res.status(401).json({
            error: "Invalid Email or Password"
        })

        const token = jwt.sign({ userId: user._id }, 'MYSECRETKEY');
        res.send({ token });
    })
});

module.exports = router;