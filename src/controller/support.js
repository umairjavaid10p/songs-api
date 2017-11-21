import * as service from '../service/support';

export const get = async (ctx) => {
    const id = parseInt(ctx.params.id, 10);
    ctx.body = await service.get(id);
};

export const getAll = async (ctx) => {
    ctx.body = await service.getAll();
};

export const post = async (ctx) => {
    const object = {
        subject: ctx.request.body.subject,
        body: ctx.request.body.body,
        userId: ctx.request.body.userId,
        isRead: ctx.request.body.isRead,
    };
    ctx.body = await service.create(object);
};

export const put = async (ctx) => {
    const object = {
        id: ctx.request.body.id,
        subject: ctx.request.body.subject,
        body: ctx.request.body.body,
        userId: ctx.request.body.userId,
        isRead: ctx.request.body.isRead,
    };
    ctx.body = await service.update(object);
};

export const remove = async (ctx) => {
    const id = parseInt(ctx.params.id, 10);
    ctx.body = await service.remove(id);
};
