import { getAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';

const AddPizzaPage = () => {
  clearPage();
  renderPageTitle('Add a pizza to the menu');
  renderAddPizzaForm();
};

function renderAddPizzaForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-5';
  const title = document.createElement('input');
  title.type = 'text';
  title.id = 'title';
  title.placeholder = 'title of your pizza';
  title.required = true;
  title.className = 'form-control mb-3';
  const content = document.createElement('input');
  content.type = 'text';
  content.id = 'content';
  content.required = true;
  content.placeholder = 'Content of your pizza';
  content.className = 'form-control mb-3';
  const submit = document.createElement('input');
  submit.value = 'Add pizza to the menu';
  submit.type = 'submit';
  submit.className = 'btn btn-danger';
  form.appendChild(title);
  form.appendChild(content);
  form.appendChild(submit);
  main.appendChild(form);
  form.addEventListener('submit', onAddPizza);
}

async function onAddPizza(e) {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const content = document.querySelector('#content').value;

  const authenticatedUser = getAuthenticatedUser();

  const options = {
    method: 'POST',
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: authenticatedUser.token,
    },
  };

  const response = await fetch('/api/pizzas', options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const newPizza = await response.json();

  console.log('New pizza added : ', newPizza);

  Navigate('/');
}

export default AddPizzaPage;
