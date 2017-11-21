import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import constants from '../constant/common';
import config from '../config';

export const createHash = (password) => {
    return bcrypt.hash(password, constants.hashSaltRounds);
};

export const compareHash = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

export const createJWT = (data) => {
    const tokenData = {
        id: data.id,
        iat: Math.floor(Date.now() / 1000),
    };

    if (data.role === 'admin') {
        return jwt.sign(tokenData, config.get('token.secret'), {expiresIn: '7d'});
    }

    return jwt.sign(tokenData, config.get('token.secret'));
};

export const verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        return jwt.verify(token, config.get('token.secret'), (error, response) => {
            if (error) {
                return reject(error);
            }
            return resolve(response);
        });
    });
};

export const createRandomString = () => {
    return crypto.randomBytes(16).toString('hex');
};
