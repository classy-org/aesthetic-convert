let getMagnitude = require('./util/get-magnitude.js');
let getSpecificity = require('./util/get-specificity.js');

function classyConvert (baseAmount, rate, deviation) {
  rate = rate || 0.9;
  deviation = deviation || 0.15;
  let spec = getSpecificity(baseAmount);
  let range = spec * rate * deviation;
  let rMag = getMagnitude(range);
  let chunk = (rMag*5) < range ? (rMag*5) : (rMag*2.5) < range ? (rMag*2.5) : rMag;
  let exact = baseAmount * rate;
  let final = exact % chunk ? (exact + (chunk - (exact % chunk))) : exact;
  return {
    base: baseAmount,
    exact: exact,
    final: final
  };
}

module.exports = classyConvert;