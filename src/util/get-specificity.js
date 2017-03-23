function getSpecificity (amount) {

  let n = -2;
  let reduced = Math.floor(amount * 100);

  while(reduced % 10 === 0) {
    reduced /= 10;
    n++;
  }

  if (reduced % 5 === 0 && Math.log10(reduced) > 1) {
    n++;
  }

  return Math.pow(10, n);

}

module.exports = getSpecificity;