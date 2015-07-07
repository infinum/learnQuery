/*global affix, cssProp*/

describe('cssProp', function() {
  'use strict';

  var $selectedElement, selectedElement;

  beforeEach(function() {
    affix('.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]');

    $selectedElement = $('#toddler');
    selectedElement = $selectedElement[0];
  });

  it('should set a CSS attribute of an HTML element', function() {
    cssProp(selectedElement, 'width', '9001px');
    expect($selectedElement.css('width')).toBe('9001px');
  });

  it('should return an existing CSS property value of an HTML element', function() {
    $selectedElement.css('display', 'none');
    expect(cssProp(selectedElement, 'display')).toBe('none');
  });

  it('should set multiple CSS properties of an HTML element', function() {
    cssProp(selectedElement, {
      'height': '100px',
      'display': 'none'
    });

    expect($selectedElement.css('display')).toBe('none');
    expect($selectedElement.css('height')).toBe('100px');
  });

  it('should properly set CSS properties if called multiple times on different HTML elements', function() {
    var $anotherEl = $('.learn-query-testing');
    var anotherEl = $anotherEl[0];

    cssProp(selectedElement, 'height', '100px');
    cssProp(anotherEl, 'display', 'none');

    expect($selectedElement.css('height')).toBe('100px');
    expect($selectedElement.css('display')).not.toBe('none');
    expect($anotherEl.css('display')).toBe('none');
  });
});