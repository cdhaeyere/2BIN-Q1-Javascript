const jwt = require('jsonwebtoken');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jwtSecret = 'ilovemyfilms!';
const lifetimeJwt = 24 * 60 * 60 * 1000;

const jsonDbPath = path.join(__dirname, '/../data/users.json');

const defaultUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
  },
];

function login(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (!userFound) return undefined;
  if (userFound.password !== password) return undefined;

  const token = jwt.sign(
    { username },
    jwtSecret,
    { expiresIn: lifetimeJwt },
  );

  const authenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

function register(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (userFound) return undefined;

  createOneUser(username, password);

  const token = jwt.sign(
    { username },
    jwtSecret,
    { expiresIn: lifetimeJwt },
  );

  const authenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

function readOneUserFromUsername(username) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.username === username);
  if (indexOfUserFound < 0) return undefined;
  return users[indexOfUserFound];
}

function createOneUser(username, password) {
  const users = parse(jsonDbPath, defaultUsers);
  const newId = users.length + 1;
  const newUser = {
    id: newId,
    username,
    password,
  };
  users.push(newUser);
  serialize(jsonDbPath, users);
}

module.exports = {
  login,
  register,
  readOneUserFromUsername,
};