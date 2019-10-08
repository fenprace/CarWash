const Sequelize = require('sequelize');

const { DATABASE_STORAGE } = require('./constants');

const database = new Sequelize({
  dialect: 'sqlite',
  storage: DATABASE_STORAGE,
  logging: false,
});

module.exports = database;