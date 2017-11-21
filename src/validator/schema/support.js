import * as rules from '../rules';

export const create = {
    properties: {
        subject: rules.string('Subject'),
        body: rules.string('Body'),
        userId: rules.id,
        isRead: rules.bool('Message isRead filed'),
    },
};

export const update = {
    properties: {
        id: rules.id,
        subject: rules.string('Subject'),
        body: rules.string('Body'),
    },
};

export const reqID = {
    properties: {
        id: rules.id,
    },
};
