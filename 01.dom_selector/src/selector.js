var domSelector = function(selectors) {
  'use strict';

  //code goes here
  return document.querySelectorAll(selectors).length === 0 ? new Array() : Array.from(document.querySelectorAll(selectors))
};

/*
prvotno rjesenje
let nodeList = document.querySelectorAll(selectors);
if (nodeList.length === 0) {
  return new Array();
}
else return Array.from(nodeList);
*/ 