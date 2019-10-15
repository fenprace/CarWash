const Router = require('koa-router');

const { User, Vehicle, Contact, Appointment } = require('../models');
const { PermissionDeniedError } = require('../utils/errors');

const router = new Router();

router.get('/', async ctx => {
  if (!ctx.state.user) {
    throw new PermissionDeniedError;
  } else if (ctx.state.user.role !== 0) {
    throw new PermissionDeniedError;
  }

  const { pageSize = 10, page = 1 } = ctx.request.query;
  const result = await Appointment.findAndCountAll({
    limit: pageSize,
    offset: (page - 1) * pageSize,
    order: [['time', 'DESC']],
    include: [
      { model: User },
      { model: Vehicle },
      { model: Contact },
    ],
  });

  ctx.body = {
    page, pageSize,
    data: result.rows,
    total: result.count,
  };
});

router.get('/timeslot', async ctx => {
  if (!ctx.state.user) {
    throw new PermissionDeniedError;
  }

  const appointments = await Appointment.findAndCountAll({
    limit: 100,
    order: [['time', 'DESC']],
    attributes: ['time'],
  });

  const timeSlots = appointments.rows.map(a => a.dataValues.time.toJSON());
  ctx.body = { data: { timeSlots } };
});

module.exports = router;