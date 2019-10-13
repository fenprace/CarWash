const Router = require('koa-router');
const bcrypt = require('bcrypt');
const moment = require('moment');

const { SALT_ROUNDS } = require('../utils/constants');
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

  const result = await User.findOne({
    where: { id },
    include: [
      { model: Vehicle },
      { model: Contact },
      { model: Appointment },
    ],
  });
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

router.get('/:id/contact', async ctx => {
  const { id } = ctx.params;
  if (!id) throw new InvalidParameterError;

  if (!ctx.state.user) throw new PermissionDeniedError;
  if (id != ctx.state.user.id && ctx.state.user.role != 0) {
    throw new PermissionDeniedError;
  }

  const user = await User.findByPk(id);
  if (!user) throw new NotFoundError;

  const contacts = await user.getContacts();
  ctx.body = { data: contacts.map(v => v.dataValues) };
});

const contactKeys = [
  'street',
  'suburb',
  'state',
  'postalCode',
  'telephoneNumber',
  'telephoneType',
  'name',
];

router.post('/:id/contact', async ctx => {
  const { id } = ctx.params;
  if (!id) throw new InvalidParameterError;

  if (!ctx.state.user) throw new PermissionDeniedError;
  if (id != ctx.state.user.id && ctx.state.user.role != 0) {
    throw new PermissionDeniedError;
  }

  if (!ctx.request.body) throw new InvalidParameterError;
  const { body } = ctx.request;
  
  const user = await User.findByPk(id);
  if (!user) throw new NotFoundError;

  const contactData = contactKeys.reduce((o, k) => {
    if (body[k] === undefined || body[k] === null) throw new InvalidParameterError;
    return { ...o, [k]: body[k] };
  }, {});

  const contact = await Contact.create(contactData);
  await user.addContact(contact);
  ctx.body = { data: contact.dataValues };
});

router.get('/:id/appointment', async ctx => {
  const { id } = ctx.params;
  if (!id) throw new InvalidParameterError;

  if (!ctx.state.user) throw new PermissionDeniedError;
  if (id != ctx.state.user.id && ctx.state.user.role != 0) {
    throw new PermissionDeniedError;
  }

  const user = await User.findByPk(id);
  
  if (!user) throw new NotFoundError;

  const appointments = await user.getAppointments({
    include: [
      { model: Vehicle },
      { model: Contact },
    ],
  });

  ctx.body = { data: appointments.map(v => v.dataValues) };
});

router.post('/:id/appointment', async ctx => {
  const { id } = ctx.params;
  if (!id) throw new InvalidParameterError;

  if (!ctx.state.user) throw new PermissionDeniedError;
  if (id != ctx.state.user.id && ctx.state.user.role != 0) {
    throw new PermissionDeniedError;
  }

  if (!ctx.request.body) throw new InvalidParameterError;
  const { body } = ctx.request;
  const { appointmentType, description, time, contactId, vehicleIds } = body;

  const user = await User.findByPk(id);
  if (!user) throw new NotFoundError;

  if (appointmentType === undefined || appointmentType === null) throw new InvalidParameterError;
  if (contactId === undefined || contactId === null) throw new InvalidParameterError;
  if (time === undefined || time === null) throw new InvalidParameterError;
  if (vehicleIds === undefined || vehicleIds === null) throw new InvalidParameterError;

  let date = null;

  try {
    date = moment(time).toDate();
  } catch (e) {
    throw new InvalidParameterError; 
  }

  const contact = await Contact.findByPk(contactId);
  if (!contact) throw new NotFoundError;

  const vehicles = vehicleIds.map(vid => {
    if (!vid) throw new InvalidParameterError;
    const v = Vehicle.findByPk(vid);
    if (!v) throw new NotFoundError;
    return v;
  });

  const appointment = await Appointment.create({ appointmentType, description, time: date });
  appointment.setContact(contact);
  appointment.addVehicles(vehicles);
  user.addAppointment(appointment);

  ctx.body = { data: appointment.dataValues };
});

module.exports = router;