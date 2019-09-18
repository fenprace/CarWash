const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');

const authorization = require('./src/middlewares/authorization');
const userRouter = require('./src/controllers/UserController');
const sessionRouter = require('./src/controllers/SessionController');

const application = new Koa();
const router = new Router();

router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/session', sessionRouter.routes(), sessionRouter.allowedMethods());

application.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 200 || ctx.status === 201) {
      ctx.body = {
        code: 0,
        message: 'success',
        ...ctx.body,
      };
    }
  } catch (e) {
    const { message, code = 1000, status = 500 } = e;

    ctx.body = { code, message };

    ctx.status = status;
  }
});

application.use(authorization);

application.use(bodyParser());
application.use(router.routes());
application.use(router.allowedMethods());

application.listen(3000);