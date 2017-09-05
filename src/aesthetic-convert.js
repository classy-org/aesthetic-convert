const getMagnitude = require('./util/get-magnitude.js');
const getSpecificity = require('./util/get-specificity.js');

/* -------------------------------------------------------------------------- *
 * Given a base amount, a conversion rate, and a maximum deviation, returns
 * an object that includes an exact conversion and a final ("aesthetic")
 * conversion of the base amount.
 * -------------------------------------------------------------------------- */

module.exports = function aestheticConvert (baseAmount, rate, deviation) {
  rate = rate || 0.9;
  deviation = deviation || 0.15;
  const spec = getSpecificity(baseAmount);
  const range = spec * rate * deviation;
  const rMag = getMagnitude(range);
  const chunk = (rMag*5) < range ? (rMag*5) : (rMag*2.5) < range ? (rMag*2.5) : rMag;
  const exact = baseAmount * rate;
  const final = exact % chunk ? (exact + (chunk - (exact % chunk))) : exact;
  return {
    base: baseAmount,
    exact: exact,
    final: final
  };
}
