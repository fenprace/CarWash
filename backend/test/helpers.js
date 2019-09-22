const bcrypt = require('bcrypt');

const { jwtSign } = require('../src/utils/jsonWebToken');
const User = require('../src/models/User');

const createToken = async (id, role) => {
  return await jwtSign(
    { id, role },
    { expiresIn: '1d' }
  );
};

const createOneUser = async (options) => {
  const password = '00000000';
  const hashed = await bcrypt.hash(password, 8);

  await User.create({
    ...options,
    password: hashed,
  });

  return {
    ...options,
    password,
    token: await createToken(0, options.role),
  };
};

const createOneCustomer = async () => {
  const options = {
    email: 'customer@email.com',
    name: 'Customer',
    tel: '0000000000',
    role: 1,
  };

  return await createOneUser(options);
};

const createOneManager = async () => {
  const options = {
    email: 'manager@email.com',
    name: 'Manager',
    tel: '0000000000',
    role: 0,
  };

  return await createOneUser(options);
};

module.exports = {
  createOneCustomer,
  createOneManager
};