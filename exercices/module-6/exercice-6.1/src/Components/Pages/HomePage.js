const HomePage = async () => {
  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=single")
    const joke = await response.json()

    const main = document.querySelector("main")
    main.innerHTML = `<h1>${joke.joke}</h1>
    <p>${joke.category}</p>`
  } catch (err) {
    console.error('HomePage::error: ', err);
  }
};

export default HomePage;
