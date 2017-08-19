import 'babel-polyfill';
import './style.css';

const timerModule = () => import('../../lib/timer.js');


document.getElementById('btn').addEventListener('click', async () => {
  const {
    timer,
  } = await timerModule();
  const count = await timer();
  document.getElementById('timer').innerText = count;
});
