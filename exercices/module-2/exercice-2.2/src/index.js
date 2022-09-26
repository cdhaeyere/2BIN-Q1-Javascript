import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

import logoImage from "./img/logo.png";
import mainImage from "./img/plex-interface.jpg";

const tableImages = [logoImage, mainImage];

renderMainPage();

function renderMainPage() {
    const main = document.querySelector('main');

    tableImages.forEach(image => {
        const objectImage = new Image();
        objectImage.src = image;
        main.appendChild(objectImage); 
    });

    const header = document.querySelector('header');
    const title = document.createElement('h1');
    title.innerText = "My Movies"
    title.classList.add('text-center');
    header.appendChild(title);
}