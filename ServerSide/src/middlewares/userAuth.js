    const jwt = require('jsonwebtoken');
    const User = require('../models/users');

    process.env.JWT_SECRET = 'my-secret-key';

    const userAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
        return res.status(401).json({ msg: 'Authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });

        if (!user) {
        throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Authorization denied' });
    }
    };

    module.exports = userAuth;
