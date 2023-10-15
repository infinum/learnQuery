var cssClass = (function() {
  'use strict';

  // code goes here
  function add (htmlElement, className) {
    htmlElement.classList.add(className);
  }

  function remove (htmlElement, className) {
    htmlElement.classList.remove(className);
  }

  function toggle (htmlElement, className) {
    htmlElement.classList.toggle(className);
  }

  function has (htmlElement, className) {
    return htmlElement.classList.contains(className);
  }

  return {add, remove, toggle, has}
})();