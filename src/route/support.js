import Router from 'koa-router';
import Errors from 'boom';
import compose from 'koa-compose';
import * as authMiddleware from '../middleware/auth';

import * as Ctrl from '../controller/support';

const router = new Router({
  prefix: '/api/support',
});

router.use(authMiddleware.isAuthenticated);

router.get('/:id', Ctrl.get);
router.get('/', Ctrl.getAll);
router.post('/', Ctrl.post);
router.put('/', Ctrl.put);
router.del('/:id', Ctrl.remove);

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
