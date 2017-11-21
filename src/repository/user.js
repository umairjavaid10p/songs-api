import dbModel from '../model';

const model = dbModel.user;
const userAudios = dbModel.userAudios;
const audio = dbModel.audio;
const tag = dbModel.tag;
const category = dbModel.category;

export const get = (payload) => {
    return model.find({
        where: payload,
    });
};

export const getAll = (payload) => {
    return model.findAll(payload);
};

export const getAllFavouriteAudios = (payload) => {
    return model.find({
        include: [{
            model: audio,
            include: [{
                model: tag,
            }, {
                model: category,
            }, {
                model,
            }],
        }],
        where: payload,
    });
};

export const create = (payload) => {
    return model.create(payload);
};

export const update = async (payload) => {
    await model.update(payload, {
        where: {
            id: payload.id,
        },
    });
    return get({id: payload.id});
};

export const remove = (id) => {
    return model.destroy({
        where: {id},
    });
};

export const getFavouriteAudio = (payload) => {
    return userAudios.find({
        where: payload,
    });
};

export const addFavouriteAudio = (payload) => {
    return userAudios.create(payload);
};

export const removeFavouriteAudio = (id) => {
    return userAudios.destroy({
        where: {id},
    });
};
