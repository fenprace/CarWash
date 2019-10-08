const request = require('supertest');
const bcrypt = require('bcrypt');

const application = require('../../src/application');
const { User } = require('../../src/models');

beforeAll(async (next) => {
  const hashed = await bcrypt.hash('00000000', 8);

  await User.create({
    email: 'test@email.com',
    password: hashed,
    role: 1,
  });

  next();
});

describe('Test POST /session', () => {
  it('Should return a token', async () => {
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

  it('Should return 400 with invalid parameters', async () => {
    const response = await request(application.callback())
      .post('/session')
      .set('Accept', 'application/json')
      .send({});

    expect(response.status).toBe(400);
  });

  it('Should return 401 with an unregistered email', async () => {
    const response = await request(application.callback())
      .post('/session')
      .set('Accept', 'application/json')
      .send({
        email: 'noSuchAnEmail@email.com',
        password: '00000000',
      });

    expect(response.status).toBe(401);
  });

  it('Should return 401 with an incorrect password', async () => {
    const response = await request(application.callback())
      .post('/session')
      .set('Accept', 'application/json')
      .send({
        email: 'test@email.com',
        password: 'notIncorrectAnyway',
      });

    expect(response.status).toBe(401);
  });
});
