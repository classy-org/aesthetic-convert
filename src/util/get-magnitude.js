function getMagnitude (amount) {
  return Math.pow(10, Math.floor(Math.log10(amount)));
}

module.exports = getMagnitude;