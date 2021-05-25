const router = (module.exports = require('express').Router());
const Todo = require('../../db/schema/Todo');
const tokenHandler = require('../../shared/middlewares/auth');

router.post('/', tokenHandler, async (req, res) => {
  const todo = await Todo.create(req.body);

  res.json({ successs: true, data: todo });
});

router.put('/:id', tokenHandler, async (req, res) => {
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

router.delete('/:id', tokenHandler, async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo) {
    return res.status(400).json({
      error: `Todo not found with id ${req.params.id}`,
      data: {},
    });
  }

  res.json({ success: true, data: {} });
});
