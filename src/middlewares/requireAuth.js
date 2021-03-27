const { User } = require('../models/user');
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ error: 'Invalid User' })
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'MYSECRETKEY', async (err, payload) => {
        if (err) {
            res.status(401).send({ error: 'Invalid User' })
        }

        const { userId } = payload;

        const user = await User.findById(userId);
        req.user = user;
    })
}