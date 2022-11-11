import HomePage from '../Pages/HomePage';
import AddFilmPage from "../Pages/AddFilmPage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import Logout from "../Logout/Logout";

const routes = {
  '/': HomePage,
  '/add-film': AddFilmPage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/logout': Logout,
};

export default routes;
