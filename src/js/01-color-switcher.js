const ref = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};
let timerIntervalChangeColor = null;
const LOCALSTR_KEY = 'colorBody';

let saverColorBody = localStorage.getItem(LOCALSTR_KEY);
ref.body.style.backgroundColor = saverColorBody;

ref.btnStop.disabled = true;

ref.btnStart.addEventListener('click', onClickBtnStart);
ref.btnStop.addEventListener('click', onClickBtnStop);

function onClickBtnStart() {
  timerIntervalChangeColor = setInterval(changeColorBody, 1000);
  ref.btnStart.classList.toggle('hover');
  ref.btnStop.classList.toggle('hover');
  ref.btnStart.disabled = true;
  ref.btnStop.disabled = false;
}

function onClickBtnStop() {
  ref.btnStop.classList.toggle('hover');
  ref.btnStart.classList.toggle('hover');
  ref.btnStart.disabled = false;
  ref.btnStop.disabled = true;
  clearInterval(timerIntervalChangeColor);
}

function changeColorBody() {
  const colorBody = getRandomHexColor();
  ref.body.style.backgroundColor = colorBody;
  localStorage.setItem(LOCALSTR_KEY, colorBody);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
