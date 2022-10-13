var express = require('express');
var router = express.Router();

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

router.get('/', function(req, res, next) {
    if (req.query['minimum-duration']) {
        const minDuration = parseInt(req.query['minimum-duration']);
        res.json(FILMS.filter(film => film.duration >= minDuration));
    }
    res.json(FILMS);
});

router.get('/:id', function(req, res, next) {
    const film = FILMS.find(film => film.id === parseInt(req.params.id));
    if (!film) return res.sendStatus(404);
    res.json(film);
});

router.post('/', function(req, res, next) {
    const title = req.body.title;
    const duration = req.body.duration;
    const budget = req.body.budget;
    const link = req.body.link;
    const newFilm = {
        id: FILMS.length + 1,
        title: title,
        duration: duration,
        budget: budget,
        link: link
    };
    FILMS.push(newFilm);
    res.json(newFilm);
});

router.delete('/:id', function(req, res, next) {
    const film = FILMS.find(film => film.id === parseInt(req.params.id));
    if (!film) return res.sendStatus(404);
    const index = FILMS.indexOf(film);
    FILMS.splice(index, 1);
    res.sendStatus(200);
});

router.patch('/:id', function(req, res, next) {
    const film = FILMS.find(film => film.id === parseInt(req.params.id));
    if (!film) return res.sendStatus(404);
    const title = req.body.title;
    const duration = req.body.duration;
    const budget = req.body.budget;
    const link = req.body.link;
    if (title) film.title = title;
    if (duration) film.duration = duration;
    if (budget) film.budget = budget;
    if (link) film.link = link;
    res.json(film);
});

module.exports = router;