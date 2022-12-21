const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/places.json');

function createOnePlace(place) {
  const places = parse(jsonDbPath, []);
  const newPlace = {
    id: getNextId(),
    nom: place.nom,
    description: place.description,
  };
  places.push(newPlace);
  serialize(jsonDbPath, places);
  return newPlace;
}

function readOnePlace(id) {
  const places = parse(jsonDbPath);
  const place = places.find((p) => p.id === id);
  return place;
}

function getNextId() {
  const places = parse(jsonDbPath);
  const lastItemIndex = places?.length !== 0 ? places.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = places[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

module.exports = {
  createOnePlace,
  readOnePlace,
};
