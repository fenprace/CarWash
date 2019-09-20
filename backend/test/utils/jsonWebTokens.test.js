const { jwtSign, jwtVerify } = require('../../src/utils/jsonWebToken');

const sleep = (duration) => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

const payload = { data: 'DATA' };

describe('Test JsonWebToken', () => {
  it('Should generate token with data', async () => {
    const token = await jwtSign(payload);
    const decoded = await jwtVerify(token);
    expect(decoded.data).toBeDefined();
    expect(decoded.data).toBe('DATA');
  });

  it('Should return an error with expired token', async () => {
    const token = await jwtSign(payload, { expiresIn: 1 });

    await sleep(2000);
    await expect(jwtVerify(token)).rejects.toThrow('jwt expired');
  });
});