const Sequelize = require('sequelize');
const database = require('../utils/database');

const Contact = database.define('contact', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  street: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  suburb: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  state: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  postalCode: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  telephoneNumber: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  telephoneType: {
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: true,
});

module.exports = Contact;