const request = require('supertest');
const application = require('../../src/application');

describe('Test POST /user', () => {
  test('Should return 200', async () => {
    const response = await request(application.callback())
      .post('/user')
      .send({
        email: 'test@valid.com',
        password: '00000000'
      })
      .set('Accept', 'application/json');
    
    console.log(response.body);

    expect(response.status).toBe(200);
  });
});
