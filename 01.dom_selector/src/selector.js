const domSelector = function (selectors) {
  'use strict';

  const selectedNodeList = document.querySelectorAll(selectors);

  return Array.from(selectedNodeList); 
}; 