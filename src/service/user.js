import Errors from 'boom';
import * as repo from '../repository/user';
import { validatePayload } from '../validator';
import * as userValidationSchemas from '../validator/schema/user';
import messages from '../message/user';
import * as authHelper from '../helper/auth';

export const get = async (id) => {
    validatePayload({id}, userValidationSchemas.reqID);
    const user = await repo.get({id});
    if (!user) {
        throw new Errors.badRequest(messages.notFound);
    }
    return user;
};

export const getAll = async () => {
    return repo.getAll({});
};

export const getFavouriteAudios = async (userId) => {
    const user = await repo.getAllFavouriteAudios({id: userId});
    user.audios.forEach((audio) => {
        audio.dataValues.favouriteCount = audio.dataValues.users.length;
        const isFavAudio = audio.dataValues.users.find(x => x.id === userId);
        audio.dataValues.isFavouriteAudio = isFavAudio !== undefined;
        delete audio.dataValues.users;
    });
    return user.audios;
};

export const getLeaderBoard = async (userId) => {
    const filters = {
        order: [
            ['meditationSeconds', 'DESC'],
            ['firstName', 'ASC'],
        ],
    };
    let users = await repo.getAll(filters);

    users.forEach((user, index) => {
        user.dataValues.leaderboardRank = index + 1;
    });
    const currentUser = users.filter(user => user.id === userId)[0];

    // Send only first 10 users
    users = users.slice(0, 10);

    return {
        users,
        currentUser,
    };
};

export const create = async (user) => {
    validatePayload(user, userValidationSchemas.create);
    return repo.create(user);
};

export const update = async (user) => {
    validatePayload(user, userValidationSchemas.update);
    return repo.update(user);
};

export const remove = async (id) => {
    validatePayload({id}, userValidationSchemas.reqID);
    await repo.remove(id);
    return messages.removed;
};

export const updatePassword = async (creds) => {
    validatePayload(creds, userValidationSchemas.updatePassword);

    const user = await repo.get({email: creds.email});
    if (!user) {
        throw new Errors.badRequest(messages.notFound);
    }

    const validPassword = authHelper.compareHash(creds.newPassword, user.password);
    if (!validPassword) {
        throw new Errors.badRequest(messages.passwordMismatch);
    }

    user.password = await authHelper.createHash(creds.newPassword);
    return repo.update(user.dataValues);
};

export const toggleFavouriteAudio = async (data) => {
    validatePayload(data, userValidationSchemas.favAudio);
    const alreadyFavourite = await repo.getFavouriteAudio(data);
    let isFavouriteAudio;
    let message;

    if (alreadyFavourite) {
        await repo.removeFavouriteAudio(alreadyFavourite.id);
        isFavouriteAudio = false;
        message = messages.audioRemovedFromFavourite;
    } else {
        await repo.addFavouriteAudio(data);
        isFavouriteAudio = true;
        message = messages.audioAddedToFavourite;
    }

    return {
        message,
        isFavouriteAudio,
    };
};

export const updateMeditationTime = async (data) => {
    validatePayload(data, userValidationSchemas.mediationSeconds);
    const userData = {
        id: data.userId,
        meditationSeconds: data.existingSeconds + data.seconds,
    };
    return repo.update(userData);
};
