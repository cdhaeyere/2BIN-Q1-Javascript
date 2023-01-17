const path = require('node:path');
const uuid = require('uuid');
const { parse, serialize } = require('../utils/json');
const { readOnePlace } = require('./places');

const jsonDbPath = path.join(__dirname, '/../data/users.json');

function readOneUser(userUuid) {
  const users = parse(jsonDbPath);
  return users?.find((u) => u.uuid === userUuid);
}

function createOneUser(user) {
  const places = parse(jsonDbPath, []);
  const newUser = {
    uuid: uuid.v4(),
    nom: user.nom,
    email: user.email,
    places: user.places,
  };
  places.push(newUser);
  serialize(jsonDbPath, places);
  return newUser;
}

function addUserPlace(userUuid, placeUuid) {
  const user = readOneUser(userUuid);
  if (!user) return null;
  user.places.push(readOnePlace(placeUuid));
  serialize(jsonDbPath, user);
  return user;
}

module.exports = {
  createOneUser,
  readOneUser,
  addUserPlace,
};
