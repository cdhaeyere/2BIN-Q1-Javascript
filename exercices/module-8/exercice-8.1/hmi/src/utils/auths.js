const STORE_NAME = 'user';
let currentUser;

const getAuthenticatedUser = () => {
  if (currentUser !== undefined) return currentUser;

  let serializedUser = localStorage.getItem(STORE_NAME);
  if (!serializedUser) {
    serializedUser = sessionStorage.getItem(STORE_NAME);
  }
  if (!serializedUser) return undefined;

  currentUser = JSON.parse(serializedUser);
  return currentUser;
};

const setAuthenticatedUser = (authenticatedUser, rememberME) => {
  if (rememberME) {
    localStorage.setItem(STORE_NAME, JSON.stringify(authenticatedUser));
  } else {
    sessionStorage.setItem(STORE_NAME, JSON.stringify(authenticatedUser));
  }

  currentUser = authenticatedUser;
};

const isAuthenticated = () => currentUser !== undefined;

const clearAuthenticatedUser = () => {
  localStorage.removeItem(STORE_NAME);
  currentUser = undefined;
};

// eslint-disable-next-line object-curly-newline
export { getAuthenticatedUser, setAuthenticatedUser, isAuthenticated, clearAuthenticatedUser };
