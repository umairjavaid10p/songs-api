import dbModel from '../model';

const model = dbModel.audio;
const tag = dbModel.tag;
const user = dbModel.user;
const category = dbModel.category;
const audioTags = dbModel.audioTags;

export const get = (payload) => {
    return model.find({
        where: payload,
        include: [{
            model: tag,
        }, {
            model: category,
        }],
    });
};

export const getAll = (payload) => {
    return model.findAll({
        include: [{
            model: tag,
        }, {
            model: user,
        }, {
            model: category,
        }],
        where: payload,
    });
};

export const getAllTagsFilteredAudios = (payload) => {
    return audioTags.findAll({
        where: {tagId: payload.tagId},
        include: [{
            model,
            where: payload.audioPayload,
            include: [{
                model: tag,
            }, {
                model: user,
            }, {
                model: category,
            }],
        }],
    });
};

export const getAllAudios = (payload) => {
    if (payload.tagId) {
        return getAllTagsFilteredAudios(payload);
    }

    return getAll(payload);
};

export const create = async (payload) => {
    const audio = await model.create(payload);
    await audio.setTags(payload.tags);
    await audio.save();

    const id = audio.id;
    return get({id});
};

export const update = async (payload) => {
    const audio = await model.find({
        where: {
            id: payload.id,
        },
    });
    await model.update(payload, {
        where: {
            id: payload.id,
        },
    });
    await audio.setTags(payload.tags);
    await audio.save();

    const id = audio.id;
    return get({id});
};

export const remove = (id) => {
    return model.destroy({
        where: {
            id,
        },
    });
};
