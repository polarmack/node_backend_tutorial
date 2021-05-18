const router = require('express').Router();
const User = require('../models/Todo');

router.get('/no_auth/', async (req, res) => {
  const todos = await User.find();
  res.json({ succes: true, count: todos.length, data: todos });
});

router.post('/no_auth/', async (req, res) => {
  const todo = await User.create(req.body);
  res.json({ succes: true, data: todo });
});

module.exports = router;
