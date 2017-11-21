import Router from 'koa-router';
import Errors from 'boom';
import compose from 'koa-compose';
import * as authMiddleware from '../middleware/auth';

import * as Ctrl from '../controller/common';
import * as UserCtrl from '../controller/user';

const router = new Router({
  prefix: '/api',
});

router.use(authMiddleware.isAuthenticated);

router.get('/validate-authorization', Ctrl.getLoggedInUser);
router.get('/initial-data', Ctrl.initialData);
router.post('/fileupload', Ctrl.fileUpload);
router.post('/base64upload', Ctrl.base64Fileupload);
router.get('/leaderBoard', UserCtrl.getLeaderBoard);

const routes = router.routes();
const allowedMethods = router.allowedMethods({
  throw: true,
  notImplemented: () => new Errors.notImplemented(),
  methodNotAllowed: () => new Errors.methodNotAllowed(),
});

export default () => compose([
  routes,
  allowedMethods,
]);
