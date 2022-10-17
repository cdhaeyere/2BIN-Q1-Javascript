const express = require('express');
const path = require('node:path');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/films.json');

const FILMS = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    duration: 142,
    budget: 25000000,
    link: 'https://youtube.com',
  },
  {
    id: 2,
    title: 'The Godfather',
    duration: 175,
    budget: 6000000,
    link: 'https://youtube.com',
  },
  {
    id: 3,
    title: 'The Godfather: Part II',
    duration: 202,
    budget: 13000000,
    link: 'https://youtube.com',
  }
];

/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res) => {
  const films = parse(jsonDbPath, FILMS);
  if (req.query['minimum-duration']) {
    const filteredFilms = films.filter(film => film.duration >= req.query['minimum-duration']);
    return res.json(filteredFilms);
  }
  return res.json(films);
});

// Read the pizza identified by an id in the menu
router.get('/:id', (req, res) => {
  const films = parse(jsonDbPath, FILMS);
  const filmFound = films.find(film => film.id === parseInt(req.params.id, 10));
  if (filmFound) {
      return res.json(filmFound);
  }
  return res.status(404).json({ message: `Film with id ${req.params.id} not found` });
});

// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) return res.sendStatus(400);

  const films = parse(jsonDbPath, FILMS);
  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
      id: nextId,
      title,
      duration,
      budget,
      link,
  }

  films.push(newFilm);
  serialize(jsonDbPath, films);
  return res.json(newFilm);
});

// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
  const films = parse(jsonDbPath, FILMS);
  const foundIndex = films.findIndex(film => film.id === parseInt(req.params.id, 10));
  if (foundIndex < 0) return res.sendStatus(404);
  films.splice(foundIndex, 1);
  serialize(jsonDbPath, films);
  return res.sendStatus(204);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title && !duration && !budget && !link) return res.sendStatus(400);

  const films = parse(jsonDbPath, FILMS);
  const foundIndex = films.findIndex(film => film.id === parseInt(req.params.id, 10));
  if (foundIndex < 0) return res.sendStatus(404);

  films[foundIndex].title = title || films[foundIndex].title;
  films[foundIndex].duration = duration || films[foundIndex].duration;
  films[foundIndex].budget = budget || films[foundIndex].budget;
  films[foundIndex].link = link || films[foundIndex].link;

  serialize(jsonDbPath, films);

  return res.json(films[foundIndex]);
});

module.exports = router;
