import 'babel-polyfill';
import './style.css';

console.log('hello world');

let count = 0;

function timer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      count += 1;
      console.log(count);
      resolve(count);
    }, 1000);
  });
}

document.getElementById('btn').addEventListener('click', async () => {
  const num = await timer();
  console.log('res', num);
});
