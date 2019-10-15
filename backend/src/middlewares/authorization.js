const { NotAuthenticatedError } = require('../utils/errors');
const { jwtVerify } = require('../utils/jsonWebToken');

const authorization = async (ctx, next) => {
  if (!(
    ctx.url.match(/\/session\/?/i)
    || (ctx.method === 'OPTIONS')
    || (ctx.method === 'POST' && ctx.url.match(/\/user\/?$/i))
  )) {
    const authorization = ctx.get('Authorization');
    if (!authorization) throw new NotAuthenticatedError();

    const token = authorization.slice(7);

    try {
      const jwtInfo = await jwtVerify(token);
      ctx.state.user = jwtInfo;
    } catch (e) {
      throw new NotAuthenticatedError();
    }
  }
  
  await next(); 
};

module.exports = authorization;