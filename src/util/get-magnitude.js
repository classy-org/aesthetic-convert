const MathLog10 = require('./math-log-10');

/* -------------------------------------------------------------------------- *
 * "Magnitude," for our purposes, means the largest integer power of 10
 * (e.g., 0.01, 0.1, 1, 10, 100) that is smaller than or equal to the given
 * value.
 *
 * In other words, it's like a version of Math.floor that reduces the value
 * to the nearest power of 10 rather than the nearest integer.
 *
 * Examples:
 * getMagnitude(0.01) // 0.01
 * getMagnitude(0.09) // 0.01
 * getMagnitude(0.5)  // 0.1
 * getMagnitude(1)    // 1
 * getMagnitude(1.75) // 1
 * getMagnitude(9999) // 1000
 * -------------------------------------------------------------------------- */

module.exports = function getMagnitude (amount) {
  return Math.pow(10, Math.floor(MathLog10(amount)));
}
