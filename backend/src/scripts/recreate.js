const sqlite = require('sqlite3');

const User = require('../models/User');

new sqlite.Database('./database.sqlite'); // Create a database if it does not exist

User.sync({ force: true }); // Drop and Create the table