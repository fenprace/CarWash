const Sequelize = require('sequelize');
const database = require('../utils/database');

const Appointment = database.define('appointment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  appointmentType: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  time: {
    type: Sequelize.DATE,
    allowNull: false,
  }
}, {
  freezeTableName: true,
  timestamps: true,
});

module.exports = Appointment;