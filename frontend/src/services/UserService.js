import service from './index';

export const logIn = async ({ email, password }) => {
  return await service.post('/session', { email, password });
};

export const register = async ({ email, password, name, tel }) => {
  return await service.post('/user', { email, password, name, tel });
};

export const read = async ({ id }) => {
  return (await service.get(`/user/${id}`)).data;
};

export const addVehicle = async ({ id, vehicleType, description }) => {
  return (await service.post(`/user/${id}/vehicle`, { vehicleType, description })).data;
};

const contactFields = [
  'street',
  'suburb',
  'state',
  'postalCode',
  'telephoneNumber',
  'telephoneType',
  'name',
];

export const addContact = async parameters => {
  const { id } = parameters;
  const data = contactFields.reduce((o, k) => {
    o[k] = parameters[k];
    return o;
  }, {});

  return (await service.post(`/user/${id}/contact`, data)).data;
};

export const bookAppointment = async ({ id, appointmentType, time, contactId, vehicleIds, description }) => {
  return await service.post(`/user/${id}/appointment`, { appointmentType, time, contactId, vehicleIds, description });
};

export const readAppointment = async ({ id, page = 1, pageSize = 10 }) => {
  return await service.get(`/user/${id}/appointment`, {
    params: { page, pageSize }
  });
};

const UserService = {
  logIn,
  register,
  read,
  addVehicle,
  addContact,
  bookAppointment,
  readAppointment,
};

export default UserService;