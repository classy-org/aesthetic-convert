const MathLog10 = require('./math-log-10');

/* -------------------------------------------------------------------------- *
 * "Specificity," for our purposes, means the largest integer power of 10
 * into which the provided value can be divided with no remainder. In other 
 * words it's the value of the decimal place (tenths, 1's, 10's, 100's, etc.)
 * of the last column without a zero.
 *
 * Values that end with 5 are treated as a special case, and are rounded up to 
 * the next specificity score, to help aesthetically convert sets with half-
 * steps such as [100, 150, 200, 250, 300]. Values which are simply 5*10^n
 * are exempted from this rule. 
 *
 * Examples:
 * getSpecificity(0.07) // .01
 * getSpecificity(1.07) // .01
 * getSpecificity(9)    // 1
 * getSpecificity(70)   // 10
 * getSpecificity(700)  // 100
 * getSpecificity(7000) // 1000
 * getSpecificity(3004) // 1
 * getSpecificity(3005) // 10 (exception)
 * getSpecificity(3006) // 1
 * getSpecificity(1500) // 1000 (exception)
 * getSpecificity(5)    // 1 (exception to the exception)
 * getSpecificity(0.50) // .1 (exception to the exception)
 * getSpecificity(0.05) // .01 (exception to the exception)
 * -------------------------------------------------------------------------- */

module.exports = function getSpecificity (amount) {

  let n = -2;
  let reduced = Math.round(amount * 100);

  while(reduced % 10 === 0) {
    reduced /= 10;
    n++;
  }

  if (reduced % 5 === 0 && MathLog10(reduced) > 1) {
    n++;
  }

  return Math.pow(10, n);

}
