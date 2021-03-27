const express = require('express');
const jwt = require('jsonwebtoken')
const { User } = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).send('User already exists')
    }

    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'MYSECRETKEY');

    res.send(token);
});

module.exports = router;