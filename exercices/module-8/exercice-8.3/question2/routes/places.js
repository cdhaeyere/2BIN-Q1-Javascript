const express = require('express');
const { createOnePlace } = require('../models/places');

const router = express.Router();

router.post('/create', (req, res) => {
  const nom = req?.body?.nom;
  const description = req?.body?.description;

  if (!nom || !description) return res.status(400).json({ message: 'Missing required fields' });

  const newPlace = createOnePlace({ nom, description });

  return res.status(201).json(newPlace.id);
});

module.exports = router;
