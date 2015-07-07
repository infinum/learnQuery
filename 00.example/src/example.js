var Fibonacci = function() {
  'use strict';

  // Predefined fibonacci sequence values
  var preComputed = {
    0: 1,
    1: 1
  };

  function step(num) {
    // A function can access parents variables (this is called a closure)
    if (preComputed[num]) {
      return preComputed[num];
    } else {
      return step(num - 1) + step(num - 2);
    }
  }

  function computeFn(num) {
    if (isNaN(num)) { // Making sure the parameter is a number
      throw new Error('Parameter must be a number');
    } else if (num < 0) { // Fibonacci sequence is not defined for negative numbers
      throw new Error('Number must be positive');
    } else {
      // Making sure the parameter is an integer.
      // There is no need to throw an error here since we can recover from it.
      num = Math.round(num);

      return step(num);
    }
  }

  // Values that are being exposed to the outside are returned.
  // This can either be a function, variable or an object that contains multiple functions and variables.
  // In this case, we are exporting function 'computeFn' that will be called 'compute' outside.
  return {
    compute: computeFn
  };
};