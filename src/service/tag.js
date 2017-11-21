import Errors from 'boom';
import * as repo from '../repository/tag';
import { validatePayload } from '../validator';
import * as tagValidationSchemas from '../validator/schema/tag';
import messages from '../message/common';

export const get = async (id) => {
    validatePayload({id}, tagValidationSchemas.reqID);
    const tag = await repo.get({id});
    if (!tag) {
        throw new Errors.badRequest(messages.notFound);
    }
    return tag;
};

export const getAll = async () => {
    return repo.getAll({});
};

export const create = async (tag) => {
    validatePayload(tag, tagValidationSchemas.create);
    return repo.create(tag);
};

export const update = async (tag) => {
    validatePayload(tag, tagValidationSchemas.update);
    return repo.update(tag);
};

export const remove = async (id) => {
    validatePayload({id}, tagValidationSchemas.reqID);
    await repo.remove(id);
    return messages.removed;
};
