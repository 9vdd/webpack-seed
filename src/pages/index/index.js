import 'babel-polyfill';
import './style.css';

let t = 0;

function timer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      t += 1;
      console.log(100);
      resolve(t);
    }, 1000);
  });
}

document.getElementById('btn').addEventListener('click', async () => {
  const tt = await timer();
  console.log(111);
  document.getElementById('timer').innerText = tt;
});
