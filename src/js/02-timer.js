import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const ref = {
  timerBtn: document.querySelector('.timer-btn'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let countTimer = 0;
let timeEnd = 0;
let isStart = true;
let timerId = null;

ref.timerBtn.addEventListener('click', onclickStartBtn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timeEnd = selectedDates[0].getTime();
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function onclickStartBtn(evt) {
  if (isStart) {
    countTimer = timeEnd - Date.now();
    if (countTimer < 0) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    onStart();
    timerId = setInterval(timerOn, 1000, timeEnd);
  } else {
    onStop('Time stop!');
    changeValue(0, 'stop');
  }
}

function onStart() {
  ref.timerBtn.textContent = 'Stop';
  ref.timerBtn.style.color = 'red';
  isStart = false;
}

function onStop(message) {
  ref.timerBtn.textContent = 'Start';
  ref.timerBtn.style.color = 'blue';
  isStart = true;
  clearInterval(timerId);
  Notify.info(message);
  chatter();
}

function timerOn(time) {
  time -= Date.now();
  changeValue(time, '');
}

function changeValue(time, trigger) {
  const { days, hours, minutes, seconds } = convertMs(time);
  ref.days.textContent = addLeadingZero(days);
  ref.hours.textContent = addLeadingZero(hours);
  ref.minutes.textContent = addLeadingZero(minutes);
  ref.seconds.textContent = addLeadingZero(seconds);
  if (!days && !hours && !minutes && !seconds && trigger !== 'stop') {
    onStop('Time ended!');
  }
}

function chatter() {
  for (let i = 0; i < 12; i++) {
    if (!(i % 2)) {
      setTimeout(() => {
        changeScale('1.3');
      }, i * 60);
    } else {
      setTimeout(() => {
        changeScale('1');
      }, i * 60);
    }
  }
}

function changeScale(scale) {
  ref.days.style.scale = scale;
  ref.hours.style.scale = scale;
  ref.minutes.style.scale = scale;
  ref.seconds.style.scale = scale;
}
