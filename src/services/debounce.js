export default function debounce(fn, delay) {
  let timer = null;

  return function wrapper(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
