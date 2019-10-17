import service from './index';

export const readTimeSlots = async () => {
  return (await service.get('/appointment/timeslot')).data;
};

export const read = async ({ id }) => {
  return (await service.get(`/appointment/${id}`)).data;
};

const AppointmentService = {
  readTimeSlots,
  read,
};

export default AppointmentService;