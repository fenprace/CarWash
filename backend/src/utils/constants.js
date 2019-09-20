const env = process.env.NODE_ENV;
const constants = {
  JWT_SECRET: Date.now().toString(),
  DATABASE_STORAGE: './database.sqlite',
  SALT_ROUNDS: 8,
};

if (env === 'test') {
  constants.JWT_SECRET = 'STATIC';
  constants.DATABASE_STORAGE = ':memory:';
}

module.exports = constants;