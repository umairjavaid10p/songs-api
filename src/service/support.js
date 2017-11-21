import Errors from 'boom';
import * as repo from '../repository/support';
import * as userRepo from '../repository/user';
import { validatePayload } from '../validator';
import * as supportValidationSchemas from '../validator/schema/support';
import messages from '../message/common';
import * as mailHelper from '../helper/mailer';
import config from '../config';

export const get = async (id) => {
    validatePayload({id}, supportValidationSchemas.reqID);
    const support = await repo.get({id});
    if (!support) {
        throw new Errors.badRequest(messages.notFound);
    }
    return support;
};

export const getAll = async () => {
    return repo.getAll({});
};

export const create = async (support) => {
    validatePayload(support, supportValidationSchemas.create);

    const supportItem = await repo.create(support);
    const user = await userRepo.get({id: supportItem.userId});
    const username = `${user.firstName} ${user.middleName} ${user.lastName}`;

    const emailData = {
        subject: `songs - Support Request from (${username})`,
        to: user.email,
        cc: config.get('email.user'),
        template: 'support',
        replacements: {
            username,
            messageSubject: supportItem.subject,
            messageBody: supportItem.body,
        },
    };
    await mailHelper.sendMail(emailData);

    return supportItem;
};

export const update = async (support) => {
    validatePayload(support, supportValidationSchemas.update);
    return repo.update(support);
};

export const remove = async (id) => {
    validatePayload({id}, supportValidationSchemas.reqID);
    await repo.remove(id);
    return messages.removed;
};
