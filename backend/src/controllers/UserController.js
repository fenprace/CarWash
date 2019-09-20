const Router = require('koa-router');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../utils/constants');
const User = require('../models/User');

const router = new Router();

router.get('/', async ctx => {
  if (ctx.request.query) {
    const { pageSize = 10, page = 1 } = ctx.request.query;
    const result = await User.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [['id', 'DESC']],
    });

    ctx.body = {
      page, pageSize,
      data: result.rows,
      total: result.count,
    };
  }
});

router.post('/', async ctx => {
  if (ctx.request.body) {
    const { email, password, name, tel } = ctx.request.body;
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    await User.create({
      email, name, tel,
      password: hashed,
      role: 1,
    });

    ctx.status = 200;
  }
});

module.exports = router;