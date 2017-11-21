import fs from 'fs';
import path from 'path';

const dirPath = path.join(__dirname, '../../');
const publicDirectory = path.join(dirPath, 'public/');
const uploadDirectory = path.join(publicDirectory, 'uploads/');
const imageDirectory = 'images/';
const audioDirectory = 'audio/';
const categoryDirectory = 'category/';
const userDirectory = 'user/';
const tagDirectory = 'tag/';

export const imageFilesDirectory = path.join(uploadDirectory, imageDirectory);
export const audioFilesDirectory = path.join(uploadDirectory, audioDirectory);
export const categoryImages = path.join(uploadDirectory, imageDirectory, categoryDirectory);
export const userImages = path.join(uploadDirectory, imageDirectory, userDirectory);
export const audioImages = path.join(uploadDirectory, imageDirectory, audioDirectory);
export const tagImages = path.join(uploadDirectory, imageDirectory, tagDirectory);

export const createUploadDirectories = () => {
    const directories = [
        publicDirectory,
        uploadDirectory,
        audioFilesDirectory,
        imageFilesDirectory,
        categoryImages,
        userImages,
        audioImages,
        tagImages,
    ];

    for (let i = 0; i < directories.length; i++) {
        if (!fs.existsSync(directories[i])) {
            fs.mkdirSync(directories[i]);
        }
    }
};


