import service from './index';

export const logIn = async ({ email, password }) => {
  const response = await service.post('/session', { email, password });
  return response.data;
};

const UserService = {
  logIn
};

export default UserService;