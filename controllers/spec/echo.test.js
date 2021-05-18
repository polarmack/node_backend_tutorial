const request = require('supertest');
const App = require('../../utils/app_test');
const controller = require('../echo');

describe('echo', () => {
  describe('GET /echo_get', () => {
    const url = '/echo_get';

    it('get test page', async () => {
      let response = await request(App(controller)).get(url);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Echo from router...');
    });
  });

  describe('GET /echo_qs', () => {
    const url = '/echo_qs?me=noob';

    it('get test page', async () => {
      let response = await request(App(controller)).get(url);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ me: 'noob' });
    });
  });

  describe('GET /echo_params', () => {
    const url = '/echo_params/20';

    it('get test page', async () => {
      let response = await request(App(controller)).get(url);
      expect(response.status).toBe(200);
      expect(response.body.params).toBe('20');
    });
  });

  describe('POST /echo_post', () => {
    const url = '/echo_post';
    const body = { me: 'noob' };

    it('get test page', async () => {
      let response = await request(App(controller)).post(url).send(body);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(body);
    });
  });
});
