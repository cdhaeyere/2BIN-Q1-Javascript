import {clearPage} from "../../utils/render";

const AddFilmPage = async () => {
  clearPage();

  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.innerHTML = `
    <label for="title">Titre</label>
    <input type="text" id="title" name="title" required>
    <label for="duration">Durée</label>
    <input type="number" id="duration" name="duration" required>
    <label for="budget">Budget</label>
    <input type="number" id="budget" name="budget" required>
    <label for="link">Lien</label>
    <input type="text" id="link" name="link" required>
    <button type="submit">Ajouter</button>
  `;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const film = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of formData.entries()) {
      film[key] = value;
    }
    const response = await fetch('http://localhost:3000/films', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(film),
    });
    if (response.status === 200) {
      alert('Film ajouté');
    } else {
      alert('Erreur lors de l\'ajout du film');
    }
  });
  main.appendChild(form);
}

export default AddFilmPage;