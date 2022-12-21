import {clearPage} from "../../utils/render";
import {readAllPlaces} from "../../utils/places";

const PhotosPage = () => {
    clearPage();

    const main = document.querySelector('main');

    const image = document.createElement('img');

    let i = 2;
    const places = readAllPlaces();
    image.src = places[i].image;
    main.appendChild(image);

    const nextButton = document.createElement('button');
    const previousButton = document.createElement('button');
    nextButton.textContent = 'Next';
    previousButton.textContent = 'Previous';
    main.appendChild(previousButton);
    main.appendChild(nextButton);

    nextButton.addEventListener('click', () => {
        if (previousButton.disabled === true) {
            previousButton.disabled = false;
        }
        if (i === places.length - 1) {
            nextButton.disabled = true;
        }
        i += 1;
        image.src = places[i].image;
    });

    previousButton.addEventListener('click', () => {
        if (nextButton.disabled === true) {
            nextButton.disabled = false;
        }
        if (i === 1) {
            previousButton.disabled = true;
        }
        i -= 1;
        image.src = places[i].image;
    });
}

export default PhotosPage;
