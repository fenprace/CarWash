const Router = require('koa-router');
const moment = require('moment');

const { User, Vehicle, Contact, Appointment } = require('../models');
const { PermissionDeniedError, InvalidParameterError, NotFoundError } = require('../utils/errors');

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

  const timeSlots = appointments.rows.map(a => moment(a.dataValues.time).toJSON());
  ctx.body = { data: { timeSlots } };
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;
  if (!id) throw new InvalidParameterError;

  if (!ctx.state.user) {
    throw new PermissionDeniedError;
  }

  const appointment = await Appointment.findOne({
    where: { id },
    include: [
      { model: User },
      { model: Vehicle },
      { model: Contact },
    ],
  });

  if (!appointment) throw new NotFoundError;
  if (ctx.state.user.id != appointment.user.id) throw new PermissionDeniedError;

  const { appointmentType, time, description, id: _id } = appointment.dataValues;
  const user = appointment.user.dataValues;
  const contact = appointment.contact.dataValues;
  const vehicles = appointment.vehicles.maps(v => v.dataValues);

  ctx.body = {
    data: {
      appointmentType, time, description, user, contact, vehicles,
      id: _id,
    },
  };
});

module.exports = router;