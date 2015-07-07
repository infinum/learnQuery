/*global affix, selector*/

describe('Selector', function() {
  'use strict';

  beforeEach(function() {
    affix('.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]');
  });

  it('should select an empty array if the element does not exist in DOM', function() {
    var selector = '.some-element-not-in-the-dom';

    // We're calling $.makeArray because we need to transform jQuery result set into real array object
    var expectedSelectedElement = $.makeArray($(selector));
    var selectedElement = domSelector();

    expect(selectedElement).toEqual(expectedSelectedElement);
    expect(selectedElement.length).toBe(0);
  });

  it('should select a DOM element with given ID', function() {
    var id = 'toddler';
    var expectedSelectedElement = $.makeArray($('#' + id));
    var selectedElement = domSelector('#' + id);

    expect(selectedElement).toEqual(expectedSelectedElement);
    expect(selectedElement.length).toBe(1);
    expect(selectedElement[0] instanceof HTMLElement).toBe(true);
    expect(selectedElement[0]).toBe(expectedSelectedElement[0]);
    expect(selectedElement[0].id).toBe(id);
  });

  it('should select DOM elements with a given class name', function() {
    var className = '.infinum';
    var selectedElementsArray = domSelector(className);
    var expectedHTMLElementsArray = $.makeArray($(className));

    expect(selectedElementsArray.length).toBe(expectedHTMLElementsArray.length);

    // We need to check for each element if it's in the expected result set because element order is not guaranteed
    selectedElementsArray.forEach(function(element) {
      expect(expectedHTMLElementsArray.indexOf(element)).not.toBe(-1);
    });
  });

  it('should select DOM elements with a given tag name', function() {
    var tagName = 'input';
    var selectedElementsArray = domSelector(tagName);
    var expectedHTMLElementsArray = $.makeArray($(tagName));

    selectedElementsArray.forEach(function(element) {
      expect(expectedHTMLElementsArray.indexOf(element)).not.toBe(-1);
    });
  });

  it('should throw an expection for invalid selector', function() {
    expect(function() {
      domSelector(')(?/');
    }).toThrowError();
  });
});