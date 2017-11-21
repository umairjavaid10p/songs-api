import fs from 'fs';
import path from 'path';
import Errors from 'boom';
import messages from '../message/upload';
import * as authHelper from '../helper/auth';
import * as directoryHelper from '../helper/directory';
import config from '../config';
// import Errors from 'boom';
// import * as repo from '../repository/user';
// import { validatePayload } from '../validator';
// import * as commonValidationSchemas from '../validator/schema/auth';
// import messages from '../message/auth';
// import * as authHelper from '../helper/auth';

export const fileUpload = async (data) => {
    // validatePayload(data, userValidationSchemas.login);

    const reader = fs.createReadStream(data.file.path);
    const fileExtension = path.extname(data.file.name);
    const fileName = authHelper.createRandomString() + fileExtension;
    let uploadsDir;

    if (data.fileType === 'image') {
        uploadsDir = path.join(directoryHelper.imageFilesDirectory, data.model, fileName);
    } else if (data.fileType === 'audio') {
        uploadsDir = path.join(directoryHelper.audioFilesDirectory, fileName);
    } else {
        throw new Errors.badRequest(messages.type);
    }


    const stream = fs.createWriteStream(uploadsDir);
    reader.pipe(stream);

    const filePathArray = stream.path.split('public');
    const filePath = `${config.get('host')}${filePathArray[1]}`;

    return {
        fileName,
        filePath,
    };
};

export const base64FileUpload = async (data) => {
    // validatePayload(data, userValidationSchemas.login);

    const fileExtension = path.extname(data.fileName);
    const fileName = authHelper.createRandomString() + fileExtension;
    const uploadsDir = path.join(directoryHelper.userImages, fileName);

    fs.writeFile(uploadsDir, data.data, 'base64', (err) => {
        if (err) {
            throw new Errors.badImplementation(err);
        }
    });

    const filePathArray = uploadsDir.split('public');
    const filePath = `${config.get('host')}${filePathArray[1]}`;

    return {
        fileName,
        filePath,
    };
};
