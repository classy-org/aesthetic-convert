const chai = require('chai');
const chaiSubset = require('chai-subset');
const service = require('./aesthetic-convert');

chai.use(chaiSubset);
const expect = chai.expect;

describe('aesthetic-convert', () => {

  it('should return an object with the correct properties', () => {
    expect(service(350, 57.737, 0.2)).to.containSubset({
      base: 350,
      exact: 20207.95,
      final: 21000
    });
  });

  // Deviation of 500.5 (100 * 10.01 * 0.5) with a chunk size of 100
  it('should round up by chunk * 5 if deviation allows', () => {
    expect(service(100, 10.01, 0.5).final).to.equal(1500);
  })

  // Deviation of 300.3 (100 * 10.01 * 0.3) with a chunk size of 100
  it('should otherwise round up by chunk * 2.5 if deviation allows', () => {
    expect(service(100, 10.01, 0.3).final).to.equal(1250);
  });

  // Deviation of 200.2 (100 * 10.01 * 0.2) with a chunk size of 100
  it('should otherwise round up by the chunk value', () => {
    expect(service(100, 10.01, 0.2).final).to.equal(1100);
  });

});