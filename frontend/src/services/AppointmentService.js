import service from './index';

export const readTimeSlots = async () => {
  return (await service.get('/appointment/timeslot')).data;
};

const AppointmentService = {
  readTimeSlots,
};

export default AppointmentService;