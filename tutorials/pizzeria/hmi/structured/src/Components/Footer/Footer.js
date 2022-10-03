import pizzaImage from '../../img/pizza2.jpg';
import logo from '../../img/js-logo.png';

const Footer = () => {
    const footer = document.querySelector('footer');
    footer.innerHTML = `<h1 class="animate__animated animate__bounce animate__delay-2s text-center">
  But we also love JS
</h1>`;

    renderSmallImage(footer, logo);
    renderSmallImage(footer, pizzaImage);
};

function renderSmallImage(wrapper, url) {
    const image = new Image(); // or document.createElement('img');
    image.src = url;
    image.height = 50;
    wrapper.appendChild(image);
}

export default Footer;