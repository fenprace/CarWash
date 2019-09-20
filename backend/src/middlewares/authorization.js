const { NoAuthorizationError } = require('../utils/errors');
const { jwtVerify } = require('../utils');

const authorization = async (ctx, next) => {
  if (
    ctx.url.match(/\/session\/?/i)
    || ( ctx.url.match(/\/user\/?/i) && ctx.method === 'POST' )
  ) {
    await next();
  } else {
    // console.log(ctx.url);
    // console.log(ctx.method);

    const authorization = ctx.get('Authorization');
    if (!authorization) throw new NoAuthorizationError();

    const token = authorization.slice(7);
    const jwtInfo = await jwtVerify(token);

    ctx.status.user = jwtInfo;

    await next();
  } 
};

module.exports = authorization;