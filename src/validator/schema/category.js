import * as rules from '../rules';

export const create = {
    properties: {
        name: rules.string('Name'),
        description: rules.string('Description'),
        imageUrl: rules.string('Image url'),
        sequence: rules.int('Sequence'),
    },
};

export const update = {
    properties: {
        id: rules.id,
        name: rules.string('First name'),
        description: rules.string('First name'),
        imageUrl: rules.string('Image url'),
        sequence: rules.int('Sequence'),
    },
};

export const reqID = {
    properties: {
        id: rules.id,
    },
};
