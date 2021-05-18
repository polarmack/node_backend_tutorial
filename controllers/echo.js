const router = require('express').Router();

router.get('/echo_get', (req, res) => {
  res.json({ message: 'Echo from router...' });
});

router.get('/echo_qs', (req, res) => {
  const query = req.query;
  res.json(query);
});

router.get('/echo_params/:message', (req, res) => {
  const message = req.params.message;
  res.json({ params: message });
});

router.post('/echo_post', (req, res) => {
  // req.body parse from body-parser middleware
  const body = req.body;
  res.json(body);
});

module.exports = router;
