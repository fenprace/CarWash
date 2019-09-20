const request = require('supertest');
const bcrypt = require('bcrypt');

const application = require('../../src/application');
const User = require('../../src/models/User');

beforeAll(async (next) => {
  const hashed = await bcrypt.hash('00000000', 8);

  await User.create({
    email: 'test@email.com',
    name: 'Tester',
    tel: '000000000',
    password: hashed,
    role: 1,
  });

  next();
});

describe('Test POST /session', () => {
  test('Should return a token', async () => {
    const response = await request(application.callback())
      .post('/session')
      .set('Accept', 'application/json')
      .send({
        email: 'test@email.com',
        password: '00000000'
      });
      
    const { body } = response;
    expect(response.status).toBe(200);
    expect(body.code).toBe(0);
    expect(body.token).toBeDefined();
  });

  test('Should return failure', async () => {
    const response = await request(application.callback())
      .post('/session')
      .set('Accept', 'application/json')
      .send({
        email: 'not an email',
      });

    expect(response.status).toBe(500);
  });
});
