const jwt = require('jsonwebtoken');
const User = require('../models/User');

const tokenHandler = async (req, res, next) => {
  let token;

  let authHeader = req.headers['authorization'];

  if (authHeader && authHeader.startsWith('Bearer')) {
    console.log('T1');
    token = authHeader.slice(7, authHeader.length);
  } else if (req.cookies.token) {
    console.log('T2');
    token = req.cookies.token;
  }

  if (!token)
    return res.status(401).json({ error: 'token is not valid', data: {} });

  try {
    let decode = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decode.user_id);
    next();
  } catch (e) {
    res.status(401).json({ error: 'token is not valid', data: {} });
  }
};

module.exports = tokenHandler;
