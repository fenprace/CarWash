const request = require('supertest');

const { User } = require('../../src/models');
const application = require('../../src/application');
const { createOneCustomer, createOneCustomerWithOneVehicle, createOneManager } = require('../helpers');

let customer = null;
let customerWithOneVehicle = null;
let manager = null;

beforeAll(async next => {
  customer = await createOneCustomer();
  customerWithOneVehicle = await createOneCustomerWithOneVehicle();
  manager = await createOneManager();

  next();
});

describe('Test GET /user/:id/vehicle', () => {
  it('Should return 401 with no authorization', async () => {
    const response = await request(application.callback())
      .get(`/user/${customer.id}/vehicle`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
  });

  it('Should return 403 when accessed as a user without privileges', async () => {
    const response = await request(application.callback())
      .get(`/user/${customerWithOneVehicle.id}/vehicle`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${customer.token}`);
    
    expect(response.status).toBe(403);
  });

  it('Should return a list of vehicles', async () => {
    const response = await request(application.callback())
      .get(`/user/${customerWithOneVehicle.id}/vehicle`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${customerWithOneVehicle.token}`);
    
    expect(response.status).toBe(200);
  });
});

describe('Test POST /user/:id/vehicle', () => {
  it('Should return 401 with no authorization', async () => {
    const response = await request(application.callback())
      .post(`/user/${customer.id}/vehicle`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
  });

  it('Should return 403 when accessed as a user without privileges', async () => {
    const response = await request(application.callback())
      .post(`/user/${customerWithOneVehicle.id}/vehicle`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${customer.token}`);
    
    expect(response.status).toBe(403);
  });

  it('Should return 400 with invalid parameters', async () => {
    const response = await request(application.callback())
      .post(`/user/${customer.id}/vehicle`)
      .send({})
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${customer.token}`);

    expect(response.status).toBe(400);
  });

  it('Should add a vehicle', async () => {
    const response = await request(application.callback())
      .post(`/user/${customer.id}/vehicle`)
      .send({
        vehicleType: 1,
        description: 'Nice Car!',
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${customer.token}`);

    expect(response.status).toBe(200);
    
    const user = await User.findByPk(customer.id);

    expect(user.dataValues).toBeDefined();
    // expect(.dataValues.role).toBe(1);
  });
});
