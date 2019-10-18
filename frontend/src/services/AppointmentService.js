import service from './index';

export const readTimeSlots = async () => {
  return (await service.get('/appointment/timeslot')).data;
};

export const read = async ({ id }) => {
  return (await service.get(`/appointment/${id}`)).data;
};

export const readAll = async ({ page = 1, pageSize = 10 }) => {
  return await service.get('/appointment', {
    params: { page, pageSize },
  });
};

const AppointmentService = {
  readTimeSlots,
  read,
};

export default AppointmentService;