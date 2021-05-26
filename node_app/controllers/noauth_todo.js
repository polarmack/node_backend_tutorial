const router = require('express').Router();

router.get('/', async (req, res) => {
  const todos = await req.db.Todo.find();

  res.status(200).json({ success: true, count: todos.length, data: todos });
});

router.get('/:id', async (req, res) => {
  const todo = await req.db.Todo.findById(req.params.id);

  if (!todo) {
    return res.status(400).json({
      error: `Todo not found with id ${req.params.id}`,
      data: {},
    });
  }

  res.status(200).json({ success: true, data: todo });
});

router.post('/', async (req, res) => {
  const todo = await req.db.Todo.create(req.body);

  res.status(201).json({ success: true, data: todo });
});

router.put('/:id', async (req, res) => {
  const updateTodo = await req.db.Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updateTodo) {
    return res.status(400).json({
      error: `Todo not found with id ${req.params.id}`,
      data: {},
    });
  }

  res.status(200).json({ success: true, data: updateTodo });
});

router.delete('/:id', async (req, res) => {
  const todo = await req.db.Todo.findByIdAndDelete(req.params.id);

  if (!todo) {
    return res.status(400).json({
      error: `Todo not found with id ${req.params.id}`,
      data: {},
    });
  }

  res.status(200).json({ success: true, data: {} });
});

module.exports = router;
