const bcrypt = require('bcrypt');

const { jwtSign } = require('../src/utils/jsonWebToken');
const { User, Vehicle } = require('../src/models');

const createToken = async (id, role) => {
  return await jwtSign(
    { id, role },
    { expiresIn: '1d' }
  );
};

const createOneUser = async (options) => {
  const password = '00000000';
  const hashed = await bcrypt.hash(password, 8);

  const user = await User.create({
    ...options,
    password: hashed,
  });

  const { id } = user;

  return {
    ...options,
    user, id, password,
    token: await createToken(id, options.role),
  };
};

const createOneCustomer = async () => {
  const options = {
    email: 'customer@email.com',
    role: 1,
  };

  return await createOneUser(options);
};

const createOneManager = async () => {
  const options = {
    email: 'manager@email.com',
    role: 0,
  };

  return await createOneUser(options);
};

const createOneCustomerWithOneVehicle = async () => {
  const options = {
    email: 'customerWithOneVehicle@email.com',
    role: 1,
  };

  const user = await createOneUser(options);
  const vehicle = await Vehicle.create({
    vehicleType: 0,
    description: 'My First Car.',
  });

  await user.user.addVehicle(vehicle);
  return user;
};

module.exports = {
  createOneCustomer,
  createOneManager,
  createOneCustomerWithOneVehicle,
};