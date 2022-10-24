import pizzaImage from '../../img/pizza2.jpg';
import logo from '../../img/js-logo.png';
import Navigate from '../Router/Navigate';

const Footer = () => {
  const footer = document.querySelector('footer');
  footer.innerHTML = `<h1 class="animate__animated animate__bounce animate__delay-2s text-center">
  But we also love JS
</h1>`;

  renderSmallImage(footer, logo);
  renderSmallImage(footer, pizzaImage, 'cheesePizza');
  attachOnPizzaClick();
};

export default Footer;

function renderSmallImage(wrapper, url, id) {
  const image = new Image(); // or document.createElement('img');
  image.src = url;
  image.height = 50;
  if (id) image.id = id;
  wrapper.appendChild(image);
}

function attachOnPizzaClick() {
  const pizza = document.querySelector('#cheesePizza');
  pizza.addEventListener('click', () => {
    Navigate('/');
  });
}
