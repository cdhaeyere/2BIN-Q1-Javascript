const path = require('node:path');
const { parse, serialize } = require('../utils/json');
const { readOnePlace } = require('./places');

const jsonDbPath = path.join(__dirname, '/../data/users.json');

function readOneUser(id) {
  const users = parse(jsonDbPath);
  return users.find((u) => u.id === id);
}

function createOneUser(user) {
  const places = parse(jsonDbPath, []);
  const newUser = {
    id: getNextId(),
    nom: user.nom,
    email: user.email,
    places: user.places,
  };
  places.push(newUser);
  serialize(jsonDbPath, places);
  return newUser;
}

function addUserPlace(userId, placeId) {
  const user = readOneUser(userId);
  console.log(`${user}addUserPlace`);
  if (!user) return null;
  user.places.push(readOnePlace(placeId));
  serialize(jsonDbPath, user);
  return user;
}

function getNextId() {
  const users = parse(jsonDbPath);
  const lastItemIndex = users?.length !== 0 ? users.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = users[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

module.exports = {
  createOneUser,
  readOneUser,
  addUserPlace,
};
