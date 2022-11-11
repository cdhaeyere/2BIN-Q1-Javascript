import {clearPage} from "../../utils/render";

const HomePage = async () => {
  clearPage();
  const main = document.querySelector('main');
  main.innerHTML = await createTableFilms();

  const deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      const {id} = event.target.dataset;
      const response = await fetch(`http://localhost:3000/films/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        alert('Film supprimé');
      } else {
        alert('Erreur lors de la suppression du film');
      }
      await HomePage();
    });
  });

  const updateButtons = document.querySelectorAll('.update');
  updateButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      const {id} = event.target.dataset;
      const response = await fetch(`http://localhost:3000/films/${id}`);
      const film = await response.json();
      const form = document.createElement('form');
      form.innerHTML = `
        <label for="title">Titre</label>
        <input type="text" id="title" name="title" value="${film.title}" required>
        <label for="duration">Durée</label>
        <input type="number" id="duration" name="duration" value="${film.duration}" required>
        <label for="budget">Budget</label>
        <input type="number" id="budget" name="budget" value="${film.budget}" required>
        <label for="link">Lien</label>
        <input type="text" id="link" name="link" value="${film.link}" required>
        <button type="submit">Modifier</button>
      `;
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        // eslint-disable-next-line no-shadow
        const film = {};
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of formData.entries()) {
          film[key] = value;
        }
        // eslint-disable-next-line no-shadow
        const response = await fetch(`http://localhost:3000/films/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(film),
        });
        if (response.status === 200) {
          alert('Film modifié');
        } else {
          alert('Erreur lors de la modification du film');
        }
        await HomePage();
      });
      main.appendChild(form);
    });
  });
};

async function createTableFilms() {
  let table = `
    <table>
      <thead>
        <tr>
          <th>Titre</th>
          <th>Durée</th>
          <th>Budget</th>
          <th>Lien</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>`;
  const response = await fetch('http://localhost:3000/films');
  const films = await response.json();
  films.forEach((film) => {
    table += `
      <tr>
        <td>${film.title}</td>
        <td>${film.duration}</td>
        <td>${film.budget}</td>
        <td>${film.link}</td>
        <td>
          <button data-id="${film.id}" class="delete">Supprimer</button>
          <button data-id="${film.id}" class="update">Modifier</button>
        </td>
      </tr>`;
  });
  table += `
      </tbody>
    </table>`;
  return table;
}

export default HomePage;
