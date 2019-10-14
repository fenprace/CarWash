const Router = require('koa-router');
const bcrypt = require('bcrypt');

const { jwtSign } = require('../utils/jsonWebToken');
const { InvalidParameterError, NoSuchUserError, IncorrectPasswordError } = require('../utils/errors');

const { User } = require('../models');

const router = new Router();

router.post('/', async ctx => {
  if (!ctx.request.body) throw new InvalidParameterError();

  const { email, password } = ctx.request.body;
  if (!(email && password)) throw new InvalidParameterError();

  const user = await User.findOne({
    attributes: ['id', 'password', 'role'],
    where: { email },
  });
  if (!user) throw new NoSuchUserError();

  const { id, role, password: userPassword } = user.dataValues;

  const isPassed  = await bcrypt.compare(password, userPassword);
  if (!isPassed) throw new IncorrectPasswordError();

  const token = await jwtSign({ id, role }, { expiresIn: '1d' });

  ctx.body = { token, id, role };
});

module.exports = router;