function cssProp(htmlElement, cssProperty, value) {
  'use strict';

  //code goes here
  switch (arguments.length) {
    case 2:
      if (typeof cssProperty ===  'object'){
        return htmlElement.style.cssText = 
        Object.keys(cssProperty).map(function(key) {
        return key + ':' + cssProperty[key]}).join("; "); 
      }
      return htmlElement.style[`${cssProperty}`];
    case 3:
      return htmlElement.setAttribute('style', `${cssProperty} : ${value}`);
  }
}