const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');

const errorCode = require('./middlewares/errorCode');
const authorization = require('./middlewares/authorization');
const userRouter = require('./controllers/UserController');
const sessionRouter = require('./controllers/SessionController');

const application = new Koa();
const router = new Router();

router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/session', sessionRouter.routes(), sessionRouter.allowedMethods());

application.use(errorCode);
application.use(authorization);
application.use(bodyParser());
application.use(router.routes());
application.use(router.allowedMethods());

module.exports = application;