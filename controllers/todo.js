const router = require('express').Router();
const User = require('../models/Todo');

router.get('/no_auth/', async (req, res) => {
  const todos = await User.find();

  res.json({ succes: true, count: todos.length, data: todos });
});

router.get('/no_auth/:id', async (req, res) => {
  const todo = await User.findById(req.params.id);

  if (!todo) {
    return res.status(400).json({
      success: false,
      error: `Todo not found with id ${req.params.id}`,
      data: {},
    });
  }

  res.json({ succes: true, data: todo });
});

router.post('/no_auth/', async (req, res) => {
  const todo = await User.create(req.body);

  res.json({ succes: true, data: todo });
});

router.put('/no_auth/:id', async (req, res) => {
  const updateTodo = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updateTodo) {
    return res.status(400).json({
      success: false,
      error: `Todo not found with id ${req.params.id}`,
      data: {},
    });
  }

  res.json({ succes: true, data: updateTodo });
});

router.delete('/no_auth/:id', async (req, res) => {
  const todo = await User.findByIdAndDelete(req.params.id);

  if (!todo) {
    return res.status(400).json({
      success: false,
      error: `Todo not found with id ${req.params.id}`,
      data: {},
    });
  }

  res.json({ succes: true, data: {} });
});

module.exports = router;
