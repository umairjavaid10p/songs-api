import compose from 'koa-compose';

const handler = async (ctx, next) => {
    try {
        await next();

        const status = ctx.status || 404;
        if (status === 404) {
            ctx.throw(404);
        }
    } catch (error) {
        // ctx.log.error(error);

        if (error.isBoom) {
            ctx.body = error.output.payload;
            ctx.status = error.output.statusCode;
            return;
        }

        ctx.status = error.status || 500;

        ctx.body = {
            statusCode: ctx.status,
            error: error.message,
        };

        ctx.app.emit('error', error, ctx);
    }
};

export default () => compose([
    handler,
]);
