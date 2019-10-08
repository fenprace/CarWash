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

  const result = await User.findOne({
    attributes: ['id', 'password', 'role'],
    where: { email },
  });
  if (!result) throw new NoSuchUserError();

  const isPassed  = await bcrypt.compare(password, result.dataValues.password);
  if (!isPassed) throw new IncorrectPasswordError();

  const token = await jwtSign({
    id: result.dataValues.id,
    role: result.dataValues.role,
  }, { expiresIn: '1d' });

  ctx.body = { 
    token
  };
});

module.exports = router;