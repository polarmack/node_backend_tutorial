const request = require('supertest');
const App = require('../../utils/app_test');
const controller = require('../todo');

describe('todo', () => {
  describe('GET /no_auth/echo_get', () => {
    const url = '/echo_get';

    it('get test page', async () => {
      let response = await request(App(controller)).get(url);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Echo from router...');
    });
  });
});
