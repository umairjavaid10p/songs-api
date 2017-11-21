import Router from 'koa-router';
import Errors from 'boom';
import compose from 'koa-compose';
import * as authMiddleware from '../middleware/auth';

import * as Ctrl from '../controller/user';

const router = new Router({
  prefix: '/api/user',
});

router.use(authMiddleware.isAuthenticated);

router.get('/:id', Ctrl.get);
router.get('/', Ctrl.getAll);
router.get('/favourite/audios', Ctrl.getFavouriteAudios);
router.post('/', Ctrl.post);
router.post('/update-password', Ctrl.updatePassword);
router.post('/toggle-favourite-audio', Ctrl.toggleFavouriteAudio);
router.post('/update-meditation-time', Ctrl.updateMeditationTime);
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
