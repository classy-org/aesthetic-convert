const MathLog10 = require('./math-log-10');

module.exports = function getSpecificity (amount) {

  let n = -2;
  let reduced = Math.floor(amount * 100);

  while(reduced % 10 === 0) {
    reduced /= 10;
    n++;
  }

  if (reduced % 5 === 0 && MathLog10(reduced) > 1) {
    n++;
  }

  return Math.pow(10, n);

}
