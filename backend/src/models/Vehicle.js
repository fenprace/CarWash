const Sequelize = require('sequelize');
const database = require('../utils/database');

const Vehicle = database.define('vehicle', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  vehicleType: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
}, {
  freezeTableName: true,
  timestamps: true,
});

module.exports = Vehicle;