const VEHICLE_TYPE_LIST = ['Hatchback', 'Sedan', 'SUV'];
export const vehicleTypeToString = type => VEHICLE_TYPE_LIST[type - 1];
export const vehicleTypeToNumber = type => VEHICLE_TYPE_LIST.findIndex(t => t === type) + 1;