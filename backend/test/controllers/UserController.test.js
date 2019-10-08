const request = require('supertest');

const application = require('../../src/application');
const { User } = require('../../src/models');
const { createOneCustomer, createOneManager } = require('../helpers');

let customer = null;
let manager = null;

beforeAll(async next => {
  customer = await createOneCustomer();
  manager = await createOneManager();

  next();
});

describe('Test GET /user', () => {
  it('Should return 401 with no authorization', async () => {
    const response = await request(application.callback())
      .get('/user')
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
  });

  it('Should return 403 when accessed as a user without privileges', async () => {
    const response = await request(application.callback())
      .get('/user')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${customer.token}`);
    
    expect(response.status).toBe(403);
  });

  it('Should return a user list', async () => {
    const response = await request(application.callback())
      .get('/user')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${manager.token}`);
    
    expect(response.status).toBe(200);
  });
});

describe('Test POST /user', () => {
  it('Should return 400 with invalid parameters', async () => {
    const response = await request(application.callback())
      .post('/user')
      .send({})
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
  });

  it('Should create a normal user', async () => {
    const response = await request(application.callback())
      .post('/user')
      .send({
        email: 'test2@email.com',
        password: '00000000',
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    
    const result = await User.findOne({
      where: { email: 'test2@email.com' }
    });

    expect(result.dataValues).toBeDefined();
    expect(result.dataValues.role).toBe(1);
  });
});

describe('Test GET /user/:id', () => {
  it('Should return 401 with no authorization', async () => {
    const response = await request(application.callback())
      .get('/user/1')
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
  });

  it('Should return 403 when accessed as a user without privileges', async () => {
    const response = await request(application.callback())
      .get('/user/1')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${customer.token}`);

    expect(response.status).toBe(403);
  });

  it('Should return 404 with an unexisted id', async () => {
    const response = await request(application.callback())
      .get('/user/999')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${manager.token}`);

    expect(response.status).toBe(404);
  });

  it('Should return a user', async () => {
    const response = await request(application.callback())
      .get('/user/1')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${manager.token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(1);
  });
});
