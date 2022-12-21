import { clearPage } from "../../utils/render";
import { readAllPlaces } from "../../utils/places";

const HomePage = () => {
  clearPage();

  const main = document.querySelector('main');

  const title = document.createElement('h1');
  title.textContent = 'Places to visit!';
  title.setAttribute("style", "text-align: center;");
  main.appendChild(title);

  const places = readAllPlaces();
  places.forEach(place => {
    const placeTitle = document.createElement('p');
    placeTitle.setAttribute("style", "text-align: center;");
    placeTitle.textContent = place.name;
    main.appendChild(placeTitle);
  });
};

export default HomePage;
