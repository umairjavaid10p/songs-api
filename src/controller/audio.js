import * as service from '../service/audio';

export const get = async (ctx) => {
    const id = parseInt(ctx.params.id, 10);
    ctx.body = await service.get(id);
};

export const getAll = async (ctx) => {
    const categoryId = ctx.request.query.categoryId;
    const tagId = ctx.request.query.tagId;
    const filters = {
        categoryId,
        tagId,
        userId: ctx.currentUser.id,
    };
    ctx.body = await service.getAll(filters);
};

export const post = async (ctx) => {
    const object = {
        name: ctx.request.body.name,
        description: ctx.request.body.description,
        imageUrl: ctx.request.body.imageUrl,
        audioUrl: ctx.request.body.audioUrl,
        audioDuration: ctx.request.body.audioDuration,
        categoryId: ctx.request.body.categoryId,
        isLocked: ctx.request.body.isLocked,
        tags: ctx.request.body.tags,
    };
    ctx.body = await service.create(object);
};

export const put = async (ctx) => {
    const object = {
        id: ctx.request.body.id,
        name: ctx.request.body.name,
        description: ctx.request.body.description,
        imageUrl: ctx.request.body.imageUrl,
        audioUrl: ctx.request.body.audioUrl,
        audioDuration: ctx.request.body.audioDuration,
        categoryId: ctx.request.body.categoryId,
        isLocked: ctx.request.body.isLocked,
        tags: ctx.request.body.tags,
    };
    ctx.body = await service.update(object);
};

export const remove = async (ctx) => {
    const id = parseInt(ctx.params.id, 10);
    ctx.body = await service.remove(id);
};
