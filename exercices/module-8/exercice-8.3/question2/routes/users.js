const express = require('express');
const { createOneUser, readOneUser, addUserPlace } = require('../models/users');
const { readOnePlace } = require('../models/places');

const router = express.Router();

router.post('/create', (req, res) => {
  const nom = req?.body?.nom;
  const email = req?.body?.email;

  if (!nom || !email) return res.status(400).json({ message: 'Missing required fields' });

  const newUser = createOneUser({ nom, email, places: [] });

  return res.status(201).json(newUser.id);
});

router.post('/addPlace', (req, res) => {
  const userId = req?.body?.userId;
  const placeId = req?.body?.placeId;

  if (!userId || !placeId) return res.status(400).json({ message: 'Missing required fields' });

  if (readOneUser(parseInt(userId, 10)) === undefined) return res.status(404).json({ message: 'User not found' });
  if (readOnePlace(parseInt(placeId, 10)) === undefined) return res.status(404).json({ message: 'Place not found' });

  const found = readOneUser(parseInt(userId, 10));
  console.log(found);
  if (found.places.includes(placeId)) return res.status(400).json({ message: 'User already has this place' });

  const user = addUserPlace(parseInt(userId, 10), parseInt(placeId, 10));

  return res.status(201).json(user);
});

module.exports = router;
