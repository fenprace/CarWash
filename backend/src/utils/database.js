const Sequelize = require('sequelize');

const { DATABASE_STORAGE } = require('./constants');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DATABASE_STORAGE,
});

module.exports = sequelize;