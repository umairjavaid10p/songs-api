import compose from 'koa-compose';

// Import all routes
import user from './user';
import auth from './auth';
import category from './category';
import audio from './audio';
import tag from './tag';
import support from './support';
import common from './common';

export default () => compose([
    user(),
    auth(),
    category(),
    audio(),
    tag(),
    support(),
    common(),
]);
