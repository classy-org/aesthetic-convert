/* -------------------------------------------------------------------------- *
 * Backport of Math.log10 for browsers that do not support it. See:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log10
 *
 * Math.log10 returns the exponent to which 10 must be raised in order to
 * return the provided value.
 *
 * Examples:
 *
 * Math.log10(input)     // output
 * 10^output             // input
 *
 * Math.log10(1000)      // 3
 * 10^3                  // 1000
 *
 * Math.log10(1500)      // 3.1760912590556813
 * 10^3.1760912590556813 // 1500
 * -------------------------------------------------------------------------- */

module.exports = function MathLog10 (x) {
  return Math.log(x) * Math.LOG10E;
};
