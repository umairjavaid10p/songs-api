import dbModel from '../model';

const model = dbModel.support;

export const get = (payload) => {
    return model.find({
        where: payload,
    });
};

export const getAll = (payload) => {
    return model.findAll({
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
        where: {
            id,
        },
    });
};
