const jwt = require('jsonwebtoken');
const { readOneUserFromUsername } = require('../models/users');

const jwtSecret = 'ilovemypizza!';

const authorize = (req, res, next) => {
  const token = req.get('authorization');
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const { username } = decoded;

    const existingUser = readOneUserFromUsername(username);

    if (!existingUser) return res.sendStatus(401);

    req.user = existingUser; // request.user object is available in all other middleware functions
    return next();
  } catch (err) {
    console.error('authorize: ', err);
    return res.sendStatus(401);
  }
};

module.exports = { authorize };
