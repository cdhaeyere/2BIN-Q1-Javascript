const homePage = `
  <img src="../../img/plex-interface.jpg" alt="Interface" />
`

const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = homePage;
};

export default HomePage;
