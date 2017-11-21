import * as service from '../service/category';

export const get = async (ctx) => {
    const id = parseInt(ctx.params.id, 10);
    ctx.body = await service.get(id);
};

export const getAll = async (ctx) => {
    ctx.body = await service.getAll();
};

export const post = async (ctx) => {
    const object = {
        name: ctx.request.body.name,
        description: ctx.request.body.description,
        imageUrl: ctx.request.body.imageUrl,
        sequence: ctx.request.body.sequence,
    };
    ctx.body = await service.create(object);
};

export const put = async (ctx) => {
    const object = {
        id: ctx.request.body.id,
        name: ctx.request.body.name,
        description: ctx.request.body.description,
        imageUrl: ctx.request.body.imageUrl,
        sequence: ctx.request.body.sequence,
    };
    ctx.body = await service.update(object);
};

export const remove = async (ctx) => {
    const id = parseInt(ctx.params.id, 10);
    ctx.body = await service.remove(id);
};
