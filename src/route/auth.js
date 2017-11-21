import Router from 'koa-router';
import Errors from 'boom';
import compose from 'koa-compose';

import * as Ctrl from '../controller/auth';

const router = new Router({
  prefix: '/api/auth',
});

router.post('/login', Ctrl.login);
router.post('/register', Ctrl.register);
router.post('/forgot-password', Ctrl.forgotPassword);
router.post('/reset-password', Ctrl.resetPassword);
router.get('/verify-token', Ctrl.verifyToken);
router.post('/social-login', Ctrl.socialLogin);

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
