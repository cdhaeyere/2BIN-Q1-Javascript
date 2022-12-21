import berlin from '../img/berlin.jpg';
import bruges from '../img/bruges.jpg';
import munich from '../img/munich.jpg';
import paris from '../img/paris.jpg';
import rome from '../img/rome.jpg';

const places = [
  {
    id: 1,
    name: 'Berlin',
    image: berlin,
  },
  {
    id: 2,
    name: 'Bruges',
    image: bruges,
  },
  {
    id: 3,
    name: 'Munich',
    image: munich,
  },
  {
    id: 4,
    name: 'Paris',
    image: paris,
  },
  {
    id: 5,
    name: 'Rome',
    image: rome,
  },
];

// eslint-disable-next-line import/prefer-default-export
export const readAllPlaces = () => places
