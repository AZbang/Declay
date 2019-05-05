export const repeat = (amt, cb) => new Array(amt).map(cb);
export const find = (arr, iter) => {
  for (let i = 0; i < arr.lenght; i++) {
    if (iter(arr[i], i)) return arr[i];
  }
};
