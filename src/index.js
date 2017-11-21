import Koa from 'koa';
import debug from 'debug';
import koaBody from 'koa-body';
import serve from 'koa-static';

import jsonMiddleware from 'koa-json';
import loggerMiddleware from 'koa-bunyan-logger';

import requestMiddleware from './middleware/request';
import errorMiddleware from './middleware/error';
import responseMiddleware from './middleware/response';

import routeMiddleware from './route';

import conf from './config';
import * as directoryHelper from './helper/directory';

// Create uploads directory if not exists
directoryHelper.createUploadDirectories();

// App start
const app = new Koa();
const d = debug('kickstarter:root');

// Public folders
app.use(serve('public'));

// Register middleware
app.use(koaBody({ multipart: true }));
app.use(jsonMiddleware());
app.use(loggerMiddleware());
app.use(requestMiddleware());
app.use(responseMiddleware());
app.use(errorMiddleware());

// Registers routes via middleware
app.use(routeMiddleware());

d('current environment: %s', conf.get('env'));
d('server started at port: %d', conf.get('port'));
app.listen(conf.get('port'));
