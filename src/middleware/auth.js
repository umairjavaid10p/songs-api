import Errors from 'boom';
import * as authHelper from '../helper/auth';
import messages from '../message/auth';

async function verifyJWT(authorization) {
    try {
        return await authHelper.verifyJWT(authorization);
    } catch (error) {
        throw new Errors.unauthorized(messages.token.invalid);
    }
}

export const isAuthenticated = async (ctx, next) => {
    const authorization = ctx.headers.authorization;
    if (!authorization) {
        throw new Errors.badRequest(messages.token.empty);
    } else {
        ctx.currentUser = await verifyJWT(authorization);
    }
    await next();
};
