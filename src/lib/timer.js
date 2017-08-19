import 'babel-polyfill';

let count = 0;
export function timer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      count += 1;
      console.log(count);
      resolve(count);
    }, 1000);
  });
}
export const aa = 'aa';
