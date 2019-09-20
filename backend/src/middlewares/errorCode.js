const errorCode = async (ctx, next) => {
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
};

module.exports = errorCode;