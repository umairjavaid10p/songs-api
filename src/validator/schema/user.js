import * as rules from '../rules';

export const create = {
    properties: {
        firstName: rules.string('First name'),
        lastName: rules.string('Last name'),
        email: rules.email(true),
    },
};

export const update = {
    properties: {
        id: rules.id,
        firstName: rules.string('First name'),
        lastName: rules.string('Last name'),
        email: rules.email(true),
    },
};

export const reqID = {
    properties: {
        id: rules.id,
    },
};

export const updatePassword = {
    properties: {
        email: rules.email(true),
        oldPassword: rules.string('Old password'),
        newPassword: rules.password(true),
    },
};

export const favAudio = {
    properties: {
        audioId: rules.id,
    },
};

export const mediationSeconds = {
    properties: {
        seconds: rules.int('Seconds'),
        existingSeconds: rules.int('Existing seconds'),
    },
};
