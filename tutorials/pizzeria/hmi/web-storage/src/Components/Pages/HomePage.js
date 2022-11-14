import { clearPage } from '../../utils/render';

const DRINKS = [
  {
    id: 1,
    title: 'Lemonade',
    content: 'Sparkling water, lemon, ice cubes',
  },
  {
    id: 2,
    title: 'Ice tea',
    content: 'Mint, ginger, water',
  },
  {
    id: 3,
    title: 'Exotic Kombucha',
    content: 'Mango, Sparkling water, Fermented tea',
  },
];

const HomePage = async () => {
  try {
    clearPage();

    const response = await fetch('/api/pizzas');

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const pizzas = await response.json();

    renderMenuFromString(pizzas);
    attachOnMouseEventsToGoGreen();
    renderDrinksFromNodes(DRINKS);
  } catch (err) {
    console.error('HomePage::error: ', err);
  }
};

function renderMenuFromString(menu) {
  const menuTableAsString = getMenuTableAsString(menu);

  const main = document.querySelector('main');

  main.innerHTML += menuTableAsString;
}

function getMenuTableAsString(menu) {
  const menuTableLines = getAllTableLinesAsString(menu);
  const menuTable = addLinesToTableHeadersAndGet(menuTableLines);
  return menuTable;
}

function addLinesToTableHeadersAndGet(tableLines) {
  const menuTable = `
  <div class="table-responsive pt-5">
    <table class="table table-danger menu">
      <tr>
        <th>Pizza</th>
        <th>Description</th>
      </tr>
      ${tableLines}    
    </table>
  </div>
  `;
  return menuTable;
}

function getAllTableLinesAsString(menu) {
  let pizzaTableLines = '';

  menu?.forEach((pizza) => {
    pizzaTableLines += `<tr>
      <td>${pizza.title}</td>
      <td>${pizza.content}</td>
    </tr>`;
  });

  return pizzaTableLines;
}

function attachOnMouseEventsToGoGreen() {
  const table = document.querySelector('table');
  table.addEventListener('mouseover', () => {
    table.className = 'table table-success';
  });

  table.addEventListener('mouseout', () => {
    table.className = 'table table-danger';
  });
}

function renderDrinksFromNodes(drinks) {
  const drinksTableAsNode = getDrinksTableAsNode(drinks);

  const main = document.querySelector('main');

  main.appendChild(drinksTableAsNode);
}

function getDrinksTableAsNode(drinks) {
  const tableWrapper = document.createElement('div');
  tableWrapper.className = 'table-responsive pt-5';
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.id = 'table-drinks';
  table.className = 'table table-success';
  tableWrapper.appendChild(table);
  table.appendChild(tbody);
  const header = document.createElement('tr');
  const header1 = document.createElement('th');
  header1.innerText = 'Drink';
  const header2 = document.createElement('th');
  header2.innerText = 'Description';
  header.appendChild(header1);
  header.appendChild(header2);
  tbody.appendChild(header);

  drinks?.forEach((drink) => {
    const line = document.createElement('tr');
    const title = document.createElement('td');
    const description = document.createElement('td');
    title.innerText = drink.title;
    description.innerText = drink.content;
    line.appendChild(title);
    line.appendChild(description);
    tbody.appendChild(line);
  });

  table.addEventListener('mouseover', () => {
    table.className = 'table table-danger';
  });

  table.addEventListener('mouseout', () => {
    table.className = 'table table-success';
  });

  return tableWrapper;
}

export default HomePage;
