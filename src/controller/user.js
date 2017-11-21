import * as service from '../service/user';

export const get = async (ctx) => {
    const id = parseInt(ctx.params.id, 10);
    ctx.body = await service.get(id);
};

export const getAll = async (ctx) => {
    ctx.body = await service.getAll();
};

export const getFavouriteAudios = async (ctx) => {
    ctx.body = await service.getFavouriteAudios(ctx.currentUser.id);
};

export const getLeaderBoard = async (ctx) => {
    const userId = ctx.currentUser.id;
    ctx.body = await service.getLeaderBoard(userId);
};

export const post = async (ctx) => {
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
    ctx.body = await service.create(object);
};

export const put = async (ctx) => {
    const object = {
        id: ctx.request.body.id,
        firstName: ctx.request.body.firstName,
        middleName: ctx.request.body.middleName,
        lastName: ctx.request.body.lastName,
        username: ctx.request.body.username,
        email: ctx.request.body.email,
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
    ctx.body = await service.update(object);
};

export const remove = async (ctx) => {
    const id = parseInt(ctx.params.id, 10);
    ctx.body = await service.remove(id);
};

export const updatePassword = async (ctx) => {
    const object = {
        email: ctx.request.body.email,
        oldPassword: ctx.request.body.oldPassword,
        newPassword: ctx.request.body.newPassword,
    };
    ctx.body = await service.updatePassword(object);
};

export const toggleFavouriteAudio = async (ctx) => {
    const object = {
        audioId: ctx.request.body.audioId,
        userId: ctx.currentUser.id,
    };
    ctx.body = await service.toggleFavouriteAudio(object);
};

export const updateMeditationTime = async (ctx) => {
    const object = {
        seconds: ctx.request.body.seconds,
        existingSeconds: ctx.request.body.existingSeconds,
        userId: ctx.currentUser.id,
    };
    ctx.body = await service.updateMeditationTime(object);
};
