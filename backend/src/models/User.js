const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  role: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  email: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  name: {
    type: Sequelize.TEXT,
  },
  tel: {
    type: Sequelize.TEXT,
  }
}, {
  freezeTableName: true,
  timestamps: true,
});

User.sync({ force: false });

module.exports = User;