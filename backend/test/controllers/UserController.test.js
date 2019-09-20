const request = require('supertest');
const bcrypt = require('bcrypt');

const application = require('../../src/application');
const User = require('../../src/models/User');

beforeAll(async (next) => {
  const hashed = await bcrypt.hash('00000000', 8);

  await User.create({
    email: 'test@email.com',
    name: 'Tester',
    tel: '111111111',
    password: hashed,
    role: 1,
  });

  next();
});

describe('Test GET /user', () => {
  test('Should return 401 with no authorization', async () => {
    const response = await request(application.callback())
      .get('/user')
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
  });

  test('Should return 403 when accessed as a user without privileges', async () => {
    const preResponse = await request(application.callback())
      .post('/session')
      .set('Accept', 'application/json')
      .send({
        email: 'test@email.com',
        password: '00000000'
      });
      
    const { token } = preResponse.body;

    const response = await request(application.callback())
      .get('/user')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(403);
  });
});

describe('Test POST /user', () => {
  test('Should return 400 with invalid parameters', async () => {
    const response = await request(application.callback())
      .post('/user')
      .send({})
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
  });
});
