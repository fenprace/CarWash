import service from './index';

export const logIn = async ({ email, password }) => {
  return await service.post('/session', { email, password });
};

const UserService = {
  logIn
};

export default UserService;