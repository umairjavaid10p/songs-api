import Errors from 'boom';
import * as repo from '../repository/user';
import { validatePayload } from '../validator';
import * as userValidationSchemas from '../validator/schema/auth';
import messages from '../message/auth';
import * as authHelper from '../helper/auth';
import * as mailHelper from '../helper/mailer';
import config from '../config';
import * as categoryService from './category';
import * as tagService from './tag';

export const login = async (creds) => {
    validatePayload(creds, userValidationSchemas.login);
    const user = await repo.get({email: creds.email});
    if (!user) {
        throw new Errors.badRequest(messages.loginFailure);
    }

    const validPassword = authHelper.compareHash(creds.password, user.password);
    if (!validPassword) {
        throw new Errors.badRequest(messages.loginFailure);
    }

    const token = authHelper.createJWT(user);
    const categories = await categoryService.getAll();
    const tags = await tagService.getAll();

    return {
        token,
        user,
        categories,
        tags,
    };
};

const sendRegisterEmail = async (user) => {
    const emailData = {
        subject: 'songs - Registration Successful',
        to: user.email,
        template: 'registration',
        replacements: {
            username: `${user.firstName} ${user.middleName} ${user.lastName}`,
            email: user.email,
            password: user.password,
        },
    };
    return await mailHelper.sendMail(emailData);
};

export const socialLogin = async (creds) => {
    validatePayload(creds, userValidationSchemas.socialLogin);
    let user = await repo.get({email: creds.email});
    if (!user) {
        user = await repo.create(creds);
        await sendRegisterEmail(creds);
    } else {
        user.isSocialLogin = creds.isSocialLogin;
        user.socialLoginSource = creds.socialLoginSource;
        user = await repo.update(user.dataValues);
    }

    const token = authHelper.createJWT(user);
    const categories = await categoryService.getAll();
    const tags = await tagService.getAll();

    return {
        token,
        user,
        categories,
        tags,
    };
};

export const register = async (creds) => {
    validatePayload(creds, userValidationSchemas.register);
    const existingUser = await repo.get({email: creds.email});
    if (existingUser) {
        throw new Errors.badRequest(messages.emailExist);
    }

    const newUser = JSON.parse(JSON.stringify(creds));
    newUser.password = await authHelper.createHash(newUser.password);
    const user = await repo.create(newUser);

    await sendRegisterEmail(creds);

    const token = authHelper.createJWT(user);
    const categories = await categoryService.getAll();
    const tags = await tagService.getAll();

    return {
        token,
        user,
        categories,
        tags,
    };
};

export const forgotPassword = async (creds) => {
    validatePayload(creds, userValidationSchemas.forgotPassword);
    const user = await repo.get({email: creds.email});
    if (!user) {
        throw new Errors.badRequest(messages.userNotExist);
    }

    user.resetToken = authHelper.createRandomString();
    const updatedUser = await repo.update(user.dataValues);

    let emailTemplate = 'forgotPasswordApp';
    if (creds.fromWeb) {
        emailTemplate = 'forgotPasswordWeb';
    }

    const emailData = {
        subject: 'songs - Reset Password',
        to: user.email,
        template: emailTemplate,
        replacements: {
            messageSubject: 'Reset your password',
            username: `${updatedUser.firstName} ${updatedUser.middleName} ${updatedUser.lastName}`,
            token: updatedUser.resetToken,
            host: config.get('host'),
        },
    };
    await mailHelper.sendMail(emailData);

    return {
        message: messages.forgotPasswordEmailSuccess,
    };
};

export const resetPassword = async (creds) => {
    validatePayload(creds, userValidationSchemas.login);
    const user = await repo.get({email: creds.email});
    if (!user) {
        throw new Errors.badRequest(messages.userNotExist);
    }

    if (!user.resetToken) {
        throw new Errors.badRequest(messages.tokenMissing);
    }

    user.password = await authHelper.createHash(creds.password);
    user.resetToken = '';

    await repo.update(user.dataValues);

    return {
        message: messages.resetPasswordSuccess,
    };
};

export const verifyToken = async (token) => {
    if (token) {
        const user = await repo.get({resetToken: token});
        if (!user) {
            throw new Errors.badRequest(messages.invalidToken);
        }
        return user;
    }
    throw new Errors.badRequest(messages.tokenMissing);
};
