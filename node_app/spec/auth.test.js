const request = require('supertest');
const App = require('../../shared/utils/app_test');
const controller = require('../controllers/auth');
const Users = require('../data/user').users;

describe('auth', () => {
  describe('POST /auth/register', () => {
    const url = '/register';

    it('invalid name', async () => {
      let response = await request(App(controller)).post(url).send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        'User validation failed: name: Please add a name'
      );
    });

    it('invalid email', async () => {
      let response = await request(App(controller)).post(url).send({
        name: 'Mo',
        email: 'test!gmail.com',
        password: 'yoboykung',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        'User validation failed: email: test!gmail.com validation error'
      );
    });

    it('already exist user', async () => {
      App.mockDb('User', Users);

      let response = await request(App(controller)).post(url).send({
        name: 'TEST_USER2',
        email: 'test@hotmail.com',
        password: 'TEST1234',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('email is already exists');
    });

    it('register success', async () => {
      App.mockDb('User', Users);

      let response = await request(App(controller)).post(url).send({
        name: 'TEST_USER2',
        email: 'test2@hotmail.com',
        password: 'TEST1234',
      });
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });

  describe('POST /auth/login', () => {
    const url = '/login';

    it('no email or password fill', async () => {
      let response = await request(App(controller)).post(url).send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('please provide an email or password');
    });

    it('invalid email', async () => {
      App.mockDb('User', Users);

      let response = await request(App(controller))
        .post(url)
        .send({ email: 'noexistemail@gmail.com', password: 'Test1234' });
      expect(response.status).toBe(401);
      expect(response.body.error).toBe('invalid email');
    });

    it('unmatch password', async () => {
      App.mockDb('User', Users);

      let response = await request(App(controller))
        .post(url)
        .send({ email: 'test@hotmail.com', password: 'unmatchpassword' });
      expect(response.status).toBe(401);
      expect(response.body.error).toBe('password is not match');
    });

    it('login success', async () => {
      App.mockDb('User', Users);

      let response = await request(App(controller))
        .post(url)
        .send({ email: 'test@hotmail.com', password: 'TEST1234' });
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });
});
