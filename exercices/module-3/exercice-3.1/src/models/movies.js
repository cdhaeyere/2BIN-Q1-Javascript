const movies = [];

function getAllMovies() {
    return movies;
}

function addOneMovie(movie) {
    movies.push(movie);
}

export { getAllMovies, addOneMovie };