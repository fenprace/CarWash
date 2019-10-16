const VEHICLE_TYPE_LIST = ['Hatchback', 'Sedan', 'SUV'];
export const vehicleTypeToString = type => VEHICLE_TYPE_LIST[type - 1];
export const vehicleTypeToNumber = type => VEHICLE_TYPE_LIST.findIndex(t => t === type) + 1;

export const APPOINTMENT_TYPE_LIST = [
  {
    appointmentType: 0,
    primary: 'Wash Outside Only',
    secondary: '$15',
  },
  {
    appointmentType: 1,
    primary: 'Wash Inside & Outside',
    secondary: '$25',
  },
  {
    appointmentType: 2,
    primary: 'Deluxe Wash',
    secondary: '$30',
  },
];
export const appointmentTypeToString = type => APPOINTMENT_TYPE_LIST[type].primary;