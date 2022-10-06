// eslint-disable-next-line import/extensions
import { getAllMovies } from '../../models/movies.js';

const ViewMoviePage = () => {
    const main = document.querySelector('main');

    const movies = getAllMovies();

    const moviesTable = getMoviesTableAsString(movies);

    main.innerHTML = moviesTable;
}

function getMoviesTableAsString(movies) {
    if (movies?.length === undefined || movies.length === 0) {
        return `<p>No movies found</p>`;
    }

    let table = `<table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Duration</th>
                <th>Budget</th>
                <th>Link</th>
            </tr>
        </thead>
        <tbody>`;

    movies.forEach(movie => {
        table += `<tr>
            <td>${movie.title}</td>
            <td>${movie.duration}</td>
            <td>${movie.budget}</td>
            <td>${movie.link}</td>
        </tr>`;
    });

    table += `</tbody>
    </table>`;

    return table;
}

export default ViewMoviePage;