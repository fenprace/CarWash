const User = require('./User');
const Contact = require('./Contact');
const Vehicle = require('./Vehicle');
const Appointment = require('./Appointment');

User.hasMany(Contact);
User.hasMany(Vehicle);
User.hasMany(Appointment);
Contact.belongsTo(User);
Vehicle.belongsTo(User);
Appointment.hasOne(Contact);
Appointment.hasMany(Vehicle);
Appointment.belongsTo(User);

User.sync({ force: false });
Contact.sync({ force: false });
Vehicle.sync({ force: false });
Appointment.sync({ force: false });

module.exports = { User, Contact, Vehicle, Appointment };
