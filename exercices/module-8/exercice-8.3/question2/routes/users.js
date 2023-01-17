const express = require('express');
const { createOneUser, readOneUser, addUserPlace } = require('../models/users');
const { readOnePlace } = require('../models/places');

const router = express.Router();

router.post('/create', (req, res) => {
  const nom = req?.body?.nom;
  const email = req?.body?.email;

  if (!nom || !email) return res.status(400).json({ message: 'Missing required fields' });

  const newUser = createOneUser({ nom, email, places: [] });

  return res.status(201).json({ uuid: newUser.uuid });
});

router.post('/addPlace', (req, res) => {
  const userUuid = req?.body?.userUuid;
  const placeUuid = req?.body?.placeUuid;

  if (!userUuid || !placeUuid) return res.status(400).json({ message: 'Missing required fields' });

  if (readOneUser(userUuid) === undefined) return res.status(404).json({ message: 'User not found' });
  if (readOnePlace(placeUuid) === undefined) return res.status(404).json({ message: 'Place not found' });

  const found = readOneUser(userUuid, 10);
  if (found.places.includes(placeUuid)) return res.status(400).json({ message: 'User already has this place' });

  const user = addUserPlace(userUuid, placeUuid, 10);

  return res.status(201).json(user);
});

module.exports = router;
