import sound from '../../sound/Infecticide-11-Pizza-Spinoza.mp3';

const Header = () => {
  renderTitleAndWrapper();
  renderAudioPlayer();
  onBodyClick();
};

function renderTitleAndWrapper() {
  const header = document.querySelector('header');
  header.innerHTML = `<h1 class="animate__animated animate__bounce text-center">
  We love Pizza
  </h1>
  <div id="navbarWrapper">
  </div>
  `;
}

function renderAudioPlayer() {
  const header = document.querySelector('header');

  header.innerHTML += `
  <div class="text-center">
    <audio id="audioPlayer" controls autoplay class="mt-3">
    <source src="${sound}" type="audio/mpeg" />
    Your browser does not support the audio element.
    </audio>
  </div>
  `;
}

function onBodyClick() {
  const body = document.querySelector('body');
  body.addEventListener('click', startOrStopSound);
}

function startOrStopSound() {
  const myAudioPlayer = document.querySelector('#audioPlayer');

  if (myAudioPlayer.paused) myAudioPlayer.play();
  else myAudioPlayer.pause();
}

export default Header;
