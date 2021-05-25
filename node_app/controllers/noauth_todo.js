const router = require('express').Router();
const Todo = require('../../db/schema/Todo');

router.get('/', async (req, res) => {
  const todos = await Todo.find();

  res.json({ success: true, count: todos.length, data: todos });
});

router.get('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(400).json({
      error: `Todo not found with id ${req.params.id}`,
      data: {},
    });
  }

  res.json({ success: true, data: todo });
});

router.post('/', async (req, res) => {
  const todo = await Todo.create(req.body);

  res.json({ success: true, data: todo });
});

router.put('/:id', async (req, res) => {
  const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updateTodo) {
    return res.status(400).json({
      error: `Todo not found with id ${req.params.id}`,
      data: {},
    });
  }

  res.json({ success: true, data: updateTodo });
});

router.delete('/:id', async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo) {
    return res.status(400).json({
      error: `Todo not found with id ${req.params.id}`,
      data: {},
    });
  }

  res.json({ success: true, data: {} });
});

module.exports = router;
