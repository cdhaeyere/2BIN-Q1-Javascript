import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const LoginPage = () => {
  clearPage();
  renderPageTitle('Login');
  renderRegisterForm();
};

function renderRegisterForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-5';
  const username = document.createElement('input');
  username.type = 'text';
  username.id = 'username';
  username.placeholder = 'username';
  username.required = true;
  username.className = 'form-control mb-3';
  const password = document.createElement('input');
  password.type = 'password';
  password.id = 'password';
  password.required = true;
  password.placeholder = 'password';
  password.className = 'form-control mb-3';
  const submit = document.createElement('input');
  submit.value = 'Login';
  submit.type = 'submit';
  submit.className = 'btn btn-danger';
  const rememberMe = document.createElement('input');
  rememberMe.type = 'checkbox';
  rememberMe.id = 'rememberMe';
  rememberMe.className = 'form-check-input';
  const rememberMeLabel = document.createElement('label');
  rememberMeLabel.htmlFor = 'rememberMe';
  rememberMeLabel.className = 'form-check-label';
  rememberMeLabel.innerText = 'Remember me';
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(rememberMe);
  form.appendChild(rememberMeLabel);
  form.appendChild(submit);
  main.appendChild(form);
  form.addEventListener('submit', onLogin);
}

async function onLogin(e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch('/api/auths/login', options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const authenticatedUser = await response.json();

  console.log('Authenticated user : ', authenticatedUser);

  const rememberMe = document.querySelector('#rememberMe').checked;

  setAuthenticatedUser(authenticatedUser, rememberMe);

  Navbar();

  Navigate('/');
}

export default LoginPage;
