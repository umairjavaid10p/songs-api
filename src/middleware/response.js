import compose from 'koa-compose';

const response = async (ctx, next) => {
    await next();
    ctx.body = {
        data: ctx.body,
        time: Date.now(),
    };
};

export default () => compose([
    response,
]);
