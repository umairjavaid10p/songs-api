import Errors from 'boom';
import * as repo from '../repository/audio';
import { validatePayload } from '../validator';
import * as audioValidationSchemas from '../validator/schema/audio';
import messages from '../message/common';

export const get = async (id) => {
    validatePayload({id}, audioValidationSchemas.reqID);
    const audio = await repo.get({id});
    if (!audio) {
        throw new Errors.badRequest(messages.notFound);
    }
    return audio;
};

export const getAll = async (filtersData) => {
    let filters = {};
    let audioFilter = {};

    if (filtersData.categoryId) {
        audioFilter = {categoryId: filtersData.categoryId};
        filters = audioFilter;
    }

    if (filtersData.tagId) {
        filters = {
            audioPayload: audioFilter,
            tagId: filtersData.tagId,
        };
    }

    const audios = await repo.getAllAudios(filters);
    audios.forEach((audio) => {
        if (audio.dataValues.audio) {
            // Due to reverse relation this is a dirty fix.
            const copyAudio = JSON.parse(JSON.stringify(audio.dataValues.audio));
            delete audio.dataValues;
            audio.dataValues = copyAudio;
        }
        audio.dataValues.favouriteCount = audio.dataValues.users.length;
        const isFavAudio = audio.dataValues.users.find(x => x.id === filtersData.userId);
        audio.dataValues.isFavouriteAudio = isFavAudio !== undefined;
        delete audio.dataValues.users;
    });

    return audios;
};

export const create = async (audio) => {
    validatePayload(audio, audioValidationSchemas.create);
    return repo.create(audio);
};

export const update = async (audio) => {
    validatePayload(audio, audioValidationSchemas.update);
    return repo.update(audio);
};

export const remove = async (id) => {
    validatePayload({id}, audioValidationSchemas.reqID);
    await repo.remove(id);
    return messages.removed;
};
