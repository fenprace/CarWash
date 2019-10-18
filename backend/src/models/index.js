const Sequelize = require('sequelize');
const database = require('../utils/database');

const User = require('./User');
const Contact = require('./Contact');
const Vehicle = require('./Vehicle');
const Appointment = require('./Appointment');

const AppointmentContact = database.define('appointment_contact', {
  key: Sequelize.STRING,
});

const AppointmentVehicle = database.define('appointment_vechicle', {
  key: Sequelize.STRING,
});

User.hasMany(Contact);
User.hasMany(Vehicle);
User.hasMany(Appointment);
Contact.belongsTo(User);
Contact.belongsToMany(Appointment, { through: AppointmentContact });
Vehicle.belongsTo(User);
Vehicle.belongsToMany(Appointment, { through: AppointmentVehicle });
Appointment.belongsTo(Contact);
Appointment.belongsToMany(Vehicle, { through: AppointmentVehicle });
Appointment.belongsTo(User);

User.sync({ force: false });
Contact.sync({ force: false });
Vehicle.sync({ force: false });
Appointment.sync({ force: false });
AppointmentContact.sync({ force: false });
AppointmentVehicle.sync({ force: false });

module.exports = { User, Contact, Vehicle, Appointment, AppointmentContact, AppointmentVehicle };
