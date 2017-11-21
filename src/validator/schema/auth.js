import * as rules from '../rules';

export const login = {
    properties: {
        email: rules.email(true),
        password: rules.password(true),
    },
};

export const register = {
    properties: {
        firstName: rules.string('First name'),
        lastName: rules.string('Last name'),
        email: rules.email(false),
        password: rules.password(true),
    },
};

export const socialLogin = {
    properties: {
        firstName: rules.string('First name'),
        lastName: rules.string('Last name'),
        email: rules.email(false),
    },
};

export const forgotPassword = {
    properties: {
        email: rules.email(true),
        fromWeb: rules.fromWeb,
    },
};
