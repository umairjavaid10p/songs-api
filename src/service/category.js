import Errors from 'boom';
import * as repo from '../repository/category';
import { validatePayload } from '../validator';
import * as categoryValidationSchemas from '../validator/schema/category';
import messages from '../message/common';

export const get = async (id) => {
    validatePayload({id}, categoryValidationSchemas.reqID);
    const category = await repo.get({id});
    if (!category) {
        throw new Errors.badRequest(messages.notFound);
    }
    return category;
};

export const getAll = async () => {
    return repo.getAll({});
};

export const create = async (category) => {
    validatePayload(category, categoryValidationSchemas.create);
    return repo.create(category);
};

export const update = async (category) => {
    validatePayload(category, categoryValidationSchemas.update);
    return repo.update(category);
};

export const remove = async (id) => {
    validatePayload({id}, categoryValidationSchemas.reqID);
    await repo.remove(id);
    return messages.removed;
};
