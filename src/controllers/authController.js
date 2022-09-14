const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { success, fail } from '../helpers/responseGenerator.js';
import { User } from '../models';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../conf/main.js';

const generateAccessToken = (userId, name, role) => {
    const payload = {
        userId,
        userName: name,
        role
    }
    console.log(payload);
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: "10m"});
}

const generateRefreshToken = (userId) => {
    const payload = {
        userId,
    }
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: "5h"});
}

class AuthController {
    async login(req, res) {
        try {
            const { login, password } = req.body;
            if (!login || !password) {
                res.status(400).json(fail(['loginOrPasswordParamsNotFound']));
                return;
            }

            const candidat = await User.findOne({
                where: {
                    login
                }
            })

            if (!candidat) {
                res.status(400).json(fail(['userNotFound']));
                return;
            }

            const validPassword = bcrypt.compareSync(password, candidat.password);
            if(!validPassword) {
                res.status(400).json(fail(['passwordIncorrect']));
                return;
            }

            const accessToken = generateAccessToken(candidat.id, candidat.login, candidat.role);
            const refreshToken = generateRefreshToken(candidat.id);
            candidat.refreshToken = refreshToken;
            await candidat.save();
            res.cookie('refresh_token', refreshToken, { path: '/api/auth/refresh', httpOnly: true })
            res.json(success({ accessToken }));

        } catch(e) {
            res.status(400).json(fail([{ code: 'loginSomeError', text: e.toString() }]));
        }
    }

    async refresh(req, res) {
        try {
            const refreshToken = req.cookies.refresh_token;

            const { userId } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

            if (!userId) {
                res.status(200).json(fail(['incorrectUserId']));
                return;
            }

            const candidat = await User.findOne({
                where: {
                    id: userId
                }
            })

            if(candidat.refreshToken !== refreshToken) {
                res.status(200).json(fail(['incorrectRefreshToken']));
            } else {
                const newAccessToken = generateAccessToken(candidat.id, candidat.name, candidat.role);
                const newRefreshToken = generateRefreshToken(candidat.id);
                candidat.refreshToken = newRefreshToken;
                await candidat.save();
                res.cookie('refresh_token', newRefreshToken, { path: '/api/auth/refresh', httpOnly: true })
                res.json(success({ accessToken: newAccessToken }));
            }
        } catch(e) {
            res.status(200).json(fail([ 'refreshTokenSomeError', e.toString()]));
        }
    }

    async get(req, res) {
        res.send(`Cookies=${req.cookies.test_cookie}`);
    }
}

export default new AuthController();
