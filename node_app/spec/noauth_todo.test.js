const request = require('supertest');
const App = require('../../shared/utils/app_test');
const controller = require('../controllers/noauth_todo');
const Todos = require('../data/todo').todo;

describe('todo', () => {
  describe('GET /no_auth/echo_get', () => {
    const url = '/';

    App.mockDb('Todo', Todos); // Mock Todos data on Todo Collection (data is located at folder ./data)

    it('get all todo', async () => {
      let response = await request(App(controller)).get(url);
      console.log(response.body);
      expect(response.status).toBe(200); // Check status code (200 success)
      expect(response.body.success).toBe(true); // Check response body success field (should be true)
      expect(response.body.data.length).toBe(2); // Check response body todos data (should be equal 2 as mock data)
    });
  });

  describe('GET /no_auth/echo_get/:id', () => {
    const url = '/60a7eaabf3f40f1be5064ca7';

    App.mockDb('Todo', Todos);

    it('get all todo', async () => {
      let response = await request(App(controller)).get(url);
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });
});
