import service from './index';

export const logIn = async ({ email, password }) => {
  return await service.post('/session', { email, password });
};

export const register = async ({ email, password, name, tel }) => {
  return await service.post('/user', { email, password, name, tel });
}

const UserService = {
  logIn,
  register,
};

export default UserService;