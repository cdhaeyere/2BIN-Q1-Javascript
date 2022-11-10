const express = require('express');
const { authorize } = require('../utils/auths');

const {
    readAllFilms,
    readOneFilm,
    createOneFilm,
    deleteOneFilm,
    updateOneFilm,
} = require('../models/films');

const router = express.Router();

router.get('/', (req, res) => {
    let duration;
    if (req?.query?.['minimum-duration']) {
        duration = parseInt(req.query['minimum-duration'], 10);
    } else {
        duration = -1;
    }
    const allFilmsGetByDuration = readAllFilms(duration);
    
    res.json(allFilmsGetByDuration);
});

router.get('/:id', (req, res) => {
    const film = readOneFilm(req.params.id);
    if (!film) return res.sendStatus(404);
    return res.json(film);
});

router.post('/', authorize, (req, res) => {
    const newFilm = {
        title: req.body.title,
        duration: req.body.duration,
        budget: req.body.budget,
        link: req.body.link
    };
    const createdFilm = createOneFilm(newFilm);
    res.json(createdFilm);
});

router.delete('/:id', authorize, (req, res) => {
    const film = deleteOneFilm(req.params.id);
    if (!film) return res.sendStatus(404);
    return res.json(film);
});

router.patch('/:id', authorize, (req, res) => {
    const title = req?.body?.title;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;
    const link = req?.body?.link;

    if (!title && !duration && !budget && !link) {
        return res.sendStatus(400);
    }

    const updatedFilm = updateOneFilm(req.params.id, { title, budget, duration, link });

    if (!updatedFilm) return res.sendStatus(404);

    return res.json(updatedFilm);
});

module.exports = router;