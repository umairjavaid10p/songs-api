import * as service from '../service/common';
import * as userService from '../service/user';
import * as categoryService from '../service/category';
import * as tagService from '../service/tag';

export const fileUpload = async (ctx) => {
    const object = {
        file: ctx.request.body.files.file,
        fileType: ctx.request.body.fields.fileType,
        model: ctx.request.body.fields.model, // Category, User, Audio
    };
    ctx.body = await service.fileUpload(object);
};

export const base64Fileupload = async (ctx) => {
    const object = {
        data: ctx.request.body.data,
        fileType: ctx.request.body.fileType,
        fileName: ctx.request.body.fileName,
    };
    ctx.body = await service.base64FileUpload(object);
};

export const getLoggedInUser = async (ctx) => {
    const id = ctx.currentUser.id;
    ctx.body = await userService.get(id);
};

export const initialData = async (ctx) => {
    const id = ctx.currentUser.id;
    const user = await userService.get(id);
    const categories = await categoryService.getAll();
    const tags = await tagService.getAll();
    ctx.body = {
        user,
        categories,
        tags,
    };
};
