const User = require('./User');
const Contact = require('./Contact');
const Vehicle = require('./Vehicle');

Contact.belongsTo(User);
Vehicle.belongsTo(User);

User.sync({ force: false });
Contact.sync({ force: false });
Vehicle.sync({ force: false });

module.exports = { User, Contact, Vehicle };