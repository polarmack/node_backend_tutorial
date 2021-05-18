const router = require('express').Router();
const User = require('../models/User');
const scrypt = require('../utils/scrypt');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Check exist user
  let checkUser = await User.findOne({
    email,
  }).select('_id');
  if (checkUser)
    return res.status(400).json({ error: 'tel or email is already exists' });

  // Create user
  let user = await User.create({
    name,
    email,
    password: await scrypt.encrypt(password),
  });

  if (!user) return res.status(400).json({ error: 'cannoet create user' });

  let token = user.getSignedJwtToken();
  if (!token) return res.status(400).json({ error: 'cannot generate token' });

  res.status(200).cookie('token', token).json({ success: true, token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ error: 'please provide an email or password' });

  // Check for user
  let user = await User.findOne({ email }).select('+password');
  if (!user) return res.status(401).json({ error: 'invalid email' });

  // Check match password
  let isMatchPassword = await scrypt.verifyPassword(password, user.password);
  if (!isMatchPassword)
    return res.status(401).send({ error: 'password is not match' });

  let token = user.getSignedJwtToken();
  if (!token) return res.status(400).json({ error: 'cannot generate token' });

  res.status(200).cookie('token', token).json({ success: true, token });
});

module.exports = router;
