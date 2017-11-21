import * as rules from '../rules';

export const create = {
    properties: {
        name: rules.string('Name'),
        description: rules.string('Description'),
        imageUrl: rules.string('Image url'),
        audioUrl: rules.string('Audio url'),
        audioDuration: rules.int('Audio duration'),
        categoryId: rules.int('Category Id'),
    },
};

export const update = {
    properties: {
        id: rules.id,
        name: rules.string('Name'),
        description: rules.string('Description'),
        imageUrl: rules.string('Image url'),
        audioUrl: rules.string('Audio url'),
        audioDuration: rules.int('Audio duration'),
        categoryId: rules.int('Category Id'),
    },
};

export const reqID = {
    properties: {
        id: rules.id,
    },
};
