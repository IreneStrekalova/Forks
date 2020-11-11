require('dotenv').config();
const emailRegex = require('email-regex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authHelper = require('../helpers/auth');

module.exports = {
    async signup(body) {
        let valid = emailRegex({exact: true}).test(body.email);
        if (!valid) {
            throw ({ status: 404, message: 'invalid email' });
        }
        let isUser = await User.query().select('id').findOne({ login: body.login});
        if (isUser) {
            throw ({ status: 409, message: 'this login is used' });
        }
        isUser = await User.query().findOne({ email: body.email}).debug();
        if (isUser) {
            throw ({ status: 409, message: 'this email is used' });
        }
        return await this.createUser(body);
    },

    async signin(body) {
        let isUser = await User.query().findOne({ login: body.login });
        if (!isUser) {
            throw ({ status: 404, message: 'user not exist' });
        }
        const passwResult = bcrypt.compareSync(body.password.trim(), isUser.password);
        if (!passwResult) {
            throw ({ status: 404, message: 'wrong password' });
        }
        const accessToken = authHelper.generateAccessToken(isUser.toJSON());
        const refreshToken = authHelper.generateRefreshToken(isUser.toJSON());
        return tokens = {
            accessToken: `Bearer ${accessToken}`,
            refreshToken: refreshToken
        }
    },

    async refreshToken(body) {
        const refreshToken = body.token;
        if (!refreshToken || !refreshToken.includes(refreshToken)) {
            throw ({ status: 404, message: 'refresh token not found' });
        }
        try {
            const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const token = authHelper.generateAccessToken(
                { id: user.id,
                  login: user.login,
                  email: user.email
                });
            return `Bearer ${token}`;
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                throw ({ message: 'Token expired' });
            } else if (err instanceof jwt.JsonWebTokenError) {
                throw ({ message: 'Token invalid' });
            }
        }
    },

    async createUser(body) {
        const salt = bcrypt.genSaltSync(10);
        const passw = bcrypt.hashSync(body.password.trim(), salt);
        const query = { login: body.login, password: passw, email: body.email.trim().toLowerCase() };

        return await User.query().insert(query);
    },

    async getUsers(page = 0, perPage = 20) {
        return await User.query().page(page, perPage);relate
    },

    async getUser(id, related) {
        let query = User.query().where({id: id});
        if (related) {
            query = query.withGraphFetched(related);
        }
        return await query;
    },

    async updateUser(id, query) {
        let isUser = await User.query().findOne({ id: id });
        if (!isUser) {
            throw ({ status: 404, message: 'user not exist' });
        }
        const passwResult = bcrypt.compareSync(query.oldPassword.trim(), isUser.password);
        if (!passwResult) {
            throw ({ status: 404, message: 'old password wrong' });
        }
        delete query.oldPassword;
        const salt = bcrypt.genSaltSync(10);
        query.password = bcrypt.hashSync(query.password.trim(), salt);

        return await User.query().patchAndFetchById(id, query);
    },

    async deleteUser(id) {
        return await User.query().deleteById(id);
    }
}