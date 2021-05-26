const request = require('supertest');
const App = require('../../shared/utils/app_test');
const controller = require('../controllers/noauth_todo');
const Todos = require('../data/todo').todo;

describe('todo', () => {
  describe('GET /no_auth/todos', () => {
    const url = '/';

    it('get all todo', async () => {
      App.mockDb('Todo', Todos); // Mock Todos data on Todo Collection (data is located at folder ./data)

      let response = await request(App(controller)).get(url);
      expect(response.status).toBe(200); // Check status code (200 success)
      expect(response.body.success).toBe(true); // Check response body success field (should be true)
      expect(response.body.data.length).toBe(2); // Check number of todos data (should be equal 2 as mock data)
    });
  });

  describe('GET /no_auth/todos/:id', () => {
    const id_params = '60a7eaabf3f40f1be5064ca7';
    const url = `/${id_params}`;

    it('get single todo', async () => {
      App.mockDb('Todo', Todos);

      let response = await request(App(controller)).get(url);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({
        order: 2,
        createdAt: '2021-05-21T17:15:12.984Z',
        title: 'Day 2 work!',
      });
    });
  });

  describe('POST /no_auth/todos', () => {
    const url = '/';

    it('create todo', async () => {
      App.mockDb('Todo', []);

      let response = await request(App(controller))
        .post(url)
        .send({ title: 'Day test work!' });
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({
        title: 'Day test work!',
      });
    });
  });

  describe('PUT /no_auth/todos/:id', () => {
    const url = '/60a7eaabf3f40f1be5064ca7';
    const request_body = { title: 'Day test work!' };

    it('update todo', async () => {
      App.mockDb('Todo', Todos);

      let response = await request(App(controller)).put(url).send(request_body);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({
        order: 2,
        createdAt: '2021-05-21T17:15:12.984Z',
        title: 'Day test work!',
      });
    });
  });

  describe('DELETE /no_auth/echo_get/:id', () => {
    const url = '/60a7eaabf3f40f1be5064ca7';

    it('delete todo', async () => {
      App.mockDb('Todo', Todos);

      let response = await request(App(controller)).delete(url);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({});
    });
  });
});
