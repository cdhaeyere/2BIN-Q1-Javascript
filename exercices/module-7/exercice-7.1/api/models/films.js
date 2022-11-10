const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

const defaultFilms = [
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

function readAllFilms(duration) {
    let getByMenu;
    const films = parse(jsonDbPath, defaultFilms);
    if (duration !== -1)
        getByMenu = films.filter((film) => film.duration >= duration);
    else
        getByMenu = films;
    return getByMenu;
}

function readOneFilm(id) {
    const idFilm = parseInt(id, 10);
    const films = parse(jsonDbPath, defaultFilms);
    const indexOfFilmFound = films.findIndex((film) => film.id === idFilm);
    if (indexOfFilmFound < 0) return undefined;

    return films[indexOfFilmFound];
}

function createOneFilm(film) {
    const films = parse(jsonDbPath, defaultFilms);
    const newFilm = {
        id: getNextId(),
        title: film.title,
        duration: film.duration,
        budget: film.budget,
        link: film.link
    };
    films.push(newFilm);
    serialize(jsonDbPath, films);
    return newFilm;
}

function getNextId() {
    const films = parse(jsonDbPath, defaultFilms);
    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = films[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
}

function deleteOneFilm(id) {
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath, defaultFilms);
    const foundIndex = films.findIndex((pizza) => pizza.id === idNumber);
    if (foundIndex < 0) return undefined;
    const deletedFilms = films.splice(foundIndex, 1);
    const deletedFilm = deletedFilms[0];
    serialize(jsonDbPath, films);

    return deletedFilm;
}

function updateOneFilm(id, propertiesToUpdate) {
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath, defaultFilms);
    const foundIndex = films.findIndex((pizza) => pizza.id === idNumber);
    if (foundIndex < 0) return undefined;

    const updatedFilm = { ...films[foundIndex], ...propertiesToUpdate };

    films[foundIndex] = updatedFilm;

    serialize(jsonDbPath, films);

    return updatedFilm;
}

module.exports = {
    readAllFilms,
    readOneFilm,
    createOneFilm,
    deleteOneFilm,
    updateOneFilm
}