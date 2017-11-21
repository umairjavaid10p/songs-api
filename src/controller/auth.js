import * as service from '../service/auth';

export const login = async (ctx) => {
    const object = {
        email: ctx.request.body.email,
        password: ctx.request.body.password,
    };
    ctx.body = await service.login(object);
};

export const socialLogin = async (ctx) => {
    const object = {
        firstName: ctx.request.body.firstName,
        middleName: ctx.request.body.middleName,
        lastName: ctx.request.body.lastName,
        username: ctx.request.body.username,
        email: ctx.request.body.email,
        password: ctx.request.body.password,
        dateOfBirth: ctx.request.body.dateOfBirth,
        phone: ctx.request.body.phone,
        country: ctx.request.body.country,
        city: ctx.request.body.city,
        state: ctx.request.body.state,
        gender: ctx.request.body.gender,
        imageUrl: ctx.request.body.imageUrl,
        isSocialLogin: ctx.request.body.isSocialLogin,
        socialLoginSource: ctx.request.body.socialLoginSource,
        isSubscribed: ctx.request.body.isSubscribed,
        role: ctx.request.body.role,
    };
    ctx.body = await service.socialLogin(object);
};

export const register = async (ctx) => {
    const object = {
        firstName: ctx.request.body.firstName,
        middleName: ctx.request.body.middleName,
        lastName: ctx.request.body.lastName,
        username: ctx.request.body.username,
        email: ctx.request.body.email,
        password: ctx.request.body.password,
        dateOfBirth: ctx.request.body.dateOfBirth,
        phone: ctx.request.body.phone,
        country: ctx.request.body.country,
        city: ctx.request.body.city,
        state: ctx.request.body.state,
        gender: ctx.request.body.gender,
        imageUrl: ctx.request.body.imageUrl,
        isSocialLogin: ctx.request.body.isSocialLogin,
        socialLoginSource: ctx.request.body.socialLoginSource,
        isSubscribed: ctx.request.body.isSubscribed,
        role: ctx.request.body.role,
    };
    ctx.body = await service.register(object);
};

export const forgotPassword = async (ctx) => {
    const object = {
        fromWeb: ctx.request.body.fromWeb,
        email: ctx.request.body.email,
    };
    ctx.body = await service.forgotPassword(object);
};

export const resetPassword = async (ctx) => {
    const object = {
        email: ctx.request.body.email,
        password: ctx.request.body.password,
    };
    ctx.body = await service.resetPassword(object);
};

export const verifyToken = async (ctx) => {
    const token = ctx.request.query.token;
    ctx.body = await service.verifyToken(token);
};
