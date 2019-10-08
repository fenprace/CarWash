const Router = require('koa-router');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../utils/constants');
const { User, Vehicle } = require('../models');
const { PermissionDeniedError, InvalidParameterError, NotFoundError } = require('../utils/errors');

const router = new Router();

router.get('/', async ctx => {
  if (!ctx.state.user) {
    throw new PermissionDeniedError;
  } else if (ctx.state.user.role !== 0) {
    throw new PermissionDeniedError;
  }

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
});

router.post('/', async ctx => {
  if (!ctx.request.body) throw new InvalidParameterError;
  
  const { email, password } = ctx.request.body;
  if (!email || !password) throw new InvalidParameterError;

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);

  await User.create({
    email,
    password: hashed,
    role: 1,
  });

  ctx.status = 200;
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;
  if (!id) throw new InvalidParameterError;

  if (!ctx.state.user) throw new PermissionDeniedError;
  if (id != ctx.state.user.id && ctx.state.user.role != 0) {
    throw new PermissionDeniedError;
  }

  const result = await User.findOne({ where: { id } });
  if (!result) throw new NotFoundError;

  ctx.body = { data: result.dataValues };
});

router.get('/:id/vehicle', async ctx => {
  const { id } = ctx.params;
  if (!id) throw new InvalidParameterError;

  if (!ctx.state.user) throw new PermissionDeniedError;
  if (id != ctx.state.user.id && ctx.state.user.role != 0) {
    throw new PermissionDeniedError;
  }

  const user = await User.findByPk(id);
  if (!user) throw new NotFoundError;

  const vehicles = await user.getVehicles();
  ctx.body = { data: vehicles.map(v => v.dataValues) };
});

router.post('/:id/vehicle', async ctx => {
  const { id } = ctx.params;
  if (!id) throw new InvalidParameterError;

  if (!ctx.state.user) throw new PermissionDeniedError;
  if (id != ctx.state.user.id && ctx.state.user.role != 0) {
    throw new PermissionDeniedError;
  }

  if (!ctx.request.body) throw new InvalidParameterError;

  const { vehicleType, description } = ctx.request.body;
  if (vehicleType === undefined || vehicleType === null) throw new InvalidParameterError;

  const user = await User.findByPk(id);
  if (!user) throw new NotFoundError;

  const vehicle = await Vehicle.create({ vehicleType, description });
  await user.addVehicle(vehicle);
  ctx.body = { data: vehicle.dataValues };
});

module.exports = router;