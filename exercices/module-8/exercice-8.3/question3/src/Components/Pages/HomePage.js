import { clearPage } from '../../utils/render';

const HomePage = async () => {
  clearPage();

  const main = document.querySelector('main');

  const request = await fetch('https://places-exam-api.azurewebsites.net/places', {
    method: 'GET',
  });

  const title = document.createElement('h1');
  title.textContent = 'Liste des lieux';
  main.appendChild(title);

  const response = await request.json();

  response.forEach((place) => {
    const placeElement = document.createElement('div');
    placeElement.innerHTML = `
      <h2>${place.name}</h2>
    `;
    main.appendChild(placeElement);
  });

  const resquestRecommened = await fetch('https://places-exam-api.azurewebsites.net/recommended', {
    method: 'GET',
  });

  const titleRecommened = document.createElement('h1');
  titleRecommened.textContent = 'Lieu recommandé';
  main.appendChild(titleRecommened);

  const responseRecommened = await resquestRecommened.json();

  const lieuRecommande = document.createElement('p');
  lieuRecommande.textContent = responseRecommened.name;
  main.appendChild(lieuRecommande);
};

export default HomePage;
