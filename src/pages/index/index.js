import './style.css';

let count = 0;

function timer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      count += 1;
      console.log(100);
      resolve();
    }, 1000);
  });
}

document.getElementById('btn').addEventListener('click', async () => {
  await timer();
  console.log(111);
  document.getElementById('timer').innerText = count;
});
