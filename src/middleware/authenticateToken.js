require('dotenv').config();
const jwt = require('jsonwebtoken');
const helper = require('../helpers/auth');

module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                next(err);
            }
            const accessToken = helper.generateAccessToken({
                id: user.id,
                login: user.login,
                email: user.email
            });
            next();
        });
    } else {
        res.status(400).json('Token not provided');
    }
}