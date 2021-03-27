const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).send('User already exists')
    }

    const user = new User({ email, password });
    await user.save();
    res.send(user)
});

module.exports = router;