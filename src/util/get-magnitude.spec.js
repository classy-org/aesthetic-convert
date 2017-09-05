const chai = require('chai');
const decache = require('decache');
const mock = require('mock-require');
const expect = chai.expect;

describe('get-magnitude', () => {

  let service;

  before(() => {
    // Mock dependencies
    mock('./math-log-10', Math.log10.bind(Math));
    // Remove service from module cache in case it was previously required
    decache('./get-magnitude');
    // Get fresh service, now using mocked dependencies
    service = require('./get-magnitude');
  });

  after(() => {
    // Restore mocked modules
    mock.stopAll();
    // Remove service with mocked dependencies from module cache 
    decache('./get-magnitude');
  });

  const TEST_VALUES = {
    '0.00000001':    0.00000001,
    '0.00000008425': 0.00000001,
    '0.0000001':     0.0000001,
    '0.0000003198':  0.0000001,
    '0.000001':      0.000001,
    '0.000002090':   0.000001, 
    '0.00001':       0.00001,
    '0.00001877':    0.00001,
    '0.0001':        0.0001,
    '0.0009736':     0.0001,
    '0.001':         0.001,
    '0.002345':      0.001,    
    '0.01':          0.01,
    '0.04555':       0.01,
    '0.1':           0.1,
    '0.799':         0.1,
    '1':             1,
    '1.513':         1,
    '10':            10,
    '17.132':        10,
    '100':           100,
    '931.587':       100,
    '1000':          1000,
    '1389.199':      1000,
    '10000':         10000,
    '59021.995':     10000,
    '100000':        100000,
    '333333.019':    100000,
    '1000000':       1000000,
    '8432187.391':   1000000,
    '10000000':      10000000,
    '10742932.444':  10000000
  };

  for (let input in TEST_VALUES) {
    it(`should return the proper "magnitude" of ${input}`, () => {
      const expected = TEST_VALUES[input];
      const output = service(input);
      expect(output).to.equal(expected);
    });
  }

})