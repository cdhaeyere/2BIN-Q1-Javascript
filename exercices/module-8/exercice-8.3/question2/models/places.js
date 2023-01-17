const path = require('node:path');
const uuid = require('uuid');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/places.json');

function createOnePlace(place) {
  const places = parse(jsonDbPath, []);
  const newPlace = {
    uuid: uuid.v4(),
    nom: place.nom,
    description: place.description,
  };
  places.push(newPlace);
  serialize(jsonDbPath, places);
  return newPlace;
}

function readOnePlace(placeUuid) {
  const places = parse(jsonDbPath);
  const place = places?.find((p) => p.uuid === placeUuid);
  return place;
}

module.exports = {
  createOnePlace,
  readOnePlace,
};
