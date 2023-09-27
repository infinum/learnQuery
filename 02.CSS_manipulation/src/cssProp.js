function cssProp() {
  'use strict';

  //code goes here
  switch (arguments.length) {
    case 2:
      if (typeof arguments[1] ===  'object'){
        let entries = Object.entries(arguments[1]);
        entries.forEach(entry => arguments[0].setAttribute('style', `${entry[0]} : ${entry[1]}`))        
      }
      return arguments[0].style[`${arguments[1]}`];
    case 3:
      return arguments[0].setAttribute('style', `${arguments[1]} : ${arguments[2]}`);
  }
}