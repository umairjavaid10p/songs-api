import nodeMailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import Errors from 'boom';
import messages from '../message/common';
import config from '../config';

const forgotWebEmailFilePath = path.join(__dirname, '../templates/', 'forgot-password-web.html');
const forgotAppEmailFilePath = path.join(__dirname, '../templates/', 'forgot-password-app.html');
const supportEmailFilePath = path.join(__dirname, '../templates/', 'support.html');
const newRegistrationFilePath = path.join(__dirname, '../templates/', 'registration.html');

const emailTemplates = {
    forgotPasswordWeb: fs.readFileSync(forgotWebEmailFilePath).toString(),
    forgotPasswordApp: fs.readFileSync(forgotAppEmailFilePath).toString(),
    support: fs.readFileSync(supportEmailFilePath).toString(),
    registration: fs.readFileSync(newRegistrationFilePath).toString(),
};

export const sendMail = async (emailData) => {
    return new Promise((resolve, reject) => {
        const transporter = nodeMailer.createTransport({
            host: config.get('email.host'),
            port: config.get('email.port'),
            secure: false,
            auth: {
                user: config.get('email.user'),
                pass: config.get('email.password'),
            },
        });

        const template = handlebars.compile(emailTemplates[emailData.template]);
        const htmlToSend = template(emailData.replacements);
        const mailOptions = {
            from: config.get('email.user'),
            to: emailData.to,
            cc: emailData.cc,
            subject: emailData.subject,
            html: htmlToSend,
        };
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                reject(messages.INTERNAL_ERROR);
                throw new Errors.badImplementation(error);
            }
            return resolve('Email sent successfully!');
        });
    });
};
