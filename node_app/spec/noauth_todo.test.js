const request = require('supertest');
const App = require('../../shared/utils/app_test');
const controller = require('../controllers/noauth_todo');
const Todos = require('../data/todo');

describe('todo', () => {
  describe('GET /no_auth/echo_get', () => {
    const url = '/';

    it('get all todo', async () => {
      let response = await request(App(controller)).get(url);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });
});
