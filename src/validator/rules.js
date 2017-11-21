import messages from '../message/validation';

export const string = (field) => {
    return {
        type: 'string',
        required: true,
        allowEmpty: false,
        messages: {
            required: field + messages.string.required,
            type: field + messages.string.type,
            allowEmpty: field + messages.string.required,
        },
    };
};

export const int = (field) => {
    return {
        type: 'integer',
        required: true,
        allowEmpty: false,
        messages: {
            type: field + messages.int.empty,
            required: field + messages.int.empty,
            allowEmpty: field + messages.int.empty,
        },
    };
};

export const bool = (field) => {
    return {
        type: 'boolean',
        required: true,
        allowEmpty: true,
        messages: {
            type: field + messages.bool.type,
            required: field + messages.bool.required,
        },
    };
};

export const email = (isRequired) => {
    return {
        type: 'string',
        required: isRequired,
        allowEmpty: false,
        maxLength: 50,
        format: 'email',
        messages: {
            type: messages.email.format,
            required: messages.email.notEmpty,
            allowEmpty: messages.email.notEmpty,
            maxLength: messages.email.len,
            format: messages.email.format,
        },
    };
};

export const password = (isRequired) => {
    return {
        type: 'string',
        required: isRequired,
        allowEmpty: false,
        minLength: 8,
        maxLength: 15,
        // pattern: /((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]))|((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[\x21-\x2F|\x3A-\x40|\x5B-\x60|\x7B-\x7E]))|((?=.*?[a-z])(?=.*?[0-9])(?=.*?[\x21-\x2F|\x3A-\x40|\x5B-\x60|\x7B-\x7E]))|((?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\x21-\x2F|\x3A-\x40|\x5B-\x60|\x7B-\x7E]))/,
        messages: {
            required: messages.password.notEmpty,
            allowEmpty: messages.password.notEmpty,
            // pattern: messages.password.pattern,
            minLength: messages.password.length,
            maxLength: messages.password.length,
        },
    };
};

export const id = {
    type: 'integer',
    required: true,
    allowEmpty: false,
    messages: {
        type: messages.id.empty,
        required: messages.id.empty,
        allowEmpty: messages.id.empty,
    },
};

export const upload = {
    type: 'string',
    required: true,
    allowEmpty: false,
    messages: {
        type: messages.upload.type,
        required: messages.upload.required,
        allowEmpty: messages.upload.notEmpty,
    },
};

export const fileType = {
    type: 'string',
    required: true,
    allowEmpty: false,
    enum: [
        'image/png',
    ],
    messages: {
        type: messages.fileType.type,
        required: messages.fileType.type,
        allowEmpty: messages.fileType.type,
        enum: messages.fileType.enum,
    },
};

export const fromWeb = {
    type: 'boolean',
    required: false,
    allowEmpty: true,
    messages: {
        type: messages.fromWeb.type,
    },
};
