const MathLog10 = require('./math-log-10');

module.exports = function getMagnitude (amount) {
  return Math.pow(10, Math.floor(MathLog10(amount)));
}
