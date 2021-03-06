const sqlite = require('sqlite3');

const { User, Contact, Vehicle, Appointment, AppointmentContact, AppointmentVehicle } = require('../models');

// Create a database if it does not exist
new sqlite.Database('./database.sqlite');

// Drop and Create the table
User.sync({ force: true });
Contact.sync({ force: true });
Vehicle.sync({ force: true });
Appointment.sync({ force: true });
AppointmentContact.sync({ force: true });
AppointmentVehicle.sync({ force: true });