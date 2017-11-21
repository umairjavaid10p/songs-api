import validator from 'revalidator';
import Errors from 'boom';

export const validatePayload = (payload, schema) => {
    const result = validator.validate(payload, schema);

    if (!result.valid) {
        throw new Errors.badRequest(result.errors[0].message);
    }
    return payload;
};
