const chai = require('chai');
const decache = require('decache');
const mock = require('mock-require');
const expect = chai.expect;

describe('get-specificity', () => { 

  let service;

  before(() => {
    // Mock dependencies
    mock('./math-log-10', Math.log10.bind(Math));
    // Remove service from module cache in case it was previously required
    decache('./get-specificity');
    // Get fresh service, now using mocked dependencies
    service = require('./get-specificity');
  });

  after(() => {
    // Restore mocked modules
    mock.stopAll();
    // Remove service with mocked dependencies from module cache 
    decache('./get-specificity');
  });

  describe('(when given round values)', () => {
    const TEST_VALUES = {
      '0.02':        0.01,
      '0.20':        0.1,
      '2.00':        1,
      '20.00':       10,
      '200.00':      100,
      '2000.00':     1000,
      '20000.00':    10000,
      '200000.00':   100000,
      '2000000.00':  1000000,
      '20000000.00': 10000000
    };
    for (let input in TEST_VALUES) {
      it(`should return the proper "specificity" of ${input}`, () => {
        const expected = TEST_VALUES[input];
        const output = service(input);
        expect(output).to.equal(expected);
      });
    }
  });

  describe('(when given non-round values)', () => {
    const TEST_VALUES = {
      '2.02':          0.01,
      '20.20':         0.1,
      '202.00':        1,
      '2020.00':       10,
      '20200.00':      100,
      '202000.00':     1000,
      '2020000.00':    10000,
      '20200000.00':   100000,
      '202000000.00':  1000000,
      '2020000000.00': 10000000
    };
    for (let input in TEST_VALUES) {
      it(`should return the proper "specificity" of ${input}`, () => {
        const expected = TEST_VALUES[input];
        const output = service(input);
        expect(output).to.equal(expected);
      });
    }
  });

  describe('(when given values ending in 5)', () => {
    const TEST_VALUES = {
      '2.05':          0.1,
      '20.50':         1,
      '205.00':        10,
      '2050.00':       100,
      '20500.00':      1000,
      '205000.00':     10000,
      '2050000.00':    100000,
      '20500000.00':   1000000,
      '205000000.00':  10000000,
      '2050000000.00': 100000000
    };
    for (let input in TEST_VALUES) {
      it(`should return the proper "specificity" of ${input}`, () => {
        const expected = TEST_VALUES[input];
        const output = service(input);
        expect(output).to.equal(expected);
      });
    }
  });

  describe('(when given values which match 5^10x)', () => {
    const TEST_VALUES = {
      '0.05':          0.01,
      '0.50':          0.1,
      '5.00':          1,
      '50.00':         10,
      '500.00':        100,
      '5000.00':       1000,
      '50000.00':      10000,
      '500000.00':     100000,
      '5000000.00':    1000000,
      '50000000.00':   10000000
    };
    for (let input in TEST_VALUES) {
      it(`should return the proper "specificity" of ${input}`, () => {
        const expected = TEST_VALUES[input];
        const output = service(input);
        expect(output).to.equal(expected);
      });
    }
  });
});