describe('Fibonacci calculator', function() {
  'use strict';

  var fibonacciCalculator;
  var song;

  beforeEach(function() {
    fibonacciCalculator = new Fibonacci();
  });

  it('should cover small numbers', function() {
    expect(fibonacciCalculator.compute(0)).toBe(1);
    expect(fibonacciCalculator.compute(1)).toBe(1);
  });

  it('should cover bigger numbers', function() {
    expect(fibonacciCalculator.compute(27)).toBe(317811);
  });

  it('should cover negative numbers', function() {
    expect(function() {
      fibonacciCalculator.compute(-1);
    }).toThrowError('Number must be positive');
  });

  it('should cover invalid values', function() {
    expect(function() {
      fibonacciCalculator.compute('the answer to life the universe and everything');
    }).toThrowError('Parameter must be a number');
  });
});