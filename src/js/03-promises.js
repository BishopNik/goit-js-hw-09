import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.info('Hello!');

const refForm = document.querySelector('.form');
refForm.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  const param = {
    delay: Number(this.elements.delay.value),
    step: Number(this.elements.step.value),
    amount: Number(this.elements.amount.value),
  };
  for (let i = 0; i < param.amount; i++) {
    let delay = param.delay + i * param.step;
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  position += 1;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
