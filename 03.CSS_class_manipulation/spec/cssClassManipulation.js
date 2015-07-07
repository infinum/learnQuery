/*global affix, cssClass*/

describe('CssClassManipulation', function() {
  'use strict';

  var $selectedElement, selectedElement;

  beforeEach(function() {
    affix('.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]');

    $selectedElement = $('#toddler');
    selectedElement = $selectedElement[0];
  });

  it('should add a css class to the element', function() {
    cssClass.add(selectedElement, 'building');
    expect($selectedElement.hasClass('building')).toBe(true);
  });

  it('should not overwrite existing css classes', function() {
    $selectedElement.addClass('spooky');
    cssClass.add(selectedElement, 'building');

    expect($selectedElement.hasClass('building')).toBe(true);
    expect($selectedElement.hasClass('spooky')).toBe(true);
  });

  it('should remove a specific css class of the element', function() {
    $selectedElement.addClass('very-important-class');
    $selectedElement.addClass('super-cool-class');

    cssClass.remove(selectedElement, 'super-cool-class');

    expect($selectedElement.hasClass('super-cool-class')).toBe(false);
    expect($selectedElement.hasClass('very-important-class')).toBe(true);
  });

  it('should toggle a css class of the element', function() {
    $selectedElement.addClass('hidden-tower');

    cssClass.toggle(selectedElement, 'hidden-tower');
    expect($selectedElement.hasClass('hidden-tower')).toBe(false);

    cssClass.toggle(selectedElement, 'hidden-tower');
    expect($selectedElement.hasClass('hidden-tower')).toBe(true);
  });

  it('should return true if a HTML element has a given css class', function() {
    $selectedElement.addClass('hidden-tower');
    expect(cssClass.has(selectedElement, 'hidden-tower')).toBe(true);
  });

  it('should return false if a HTML element doesn\'t have a given css class', function() {
    $selectedElement.removeClass('hidden-tower');
    expect(cssClass.has(selectedElement, 'hidden-tower')).toBe(false);
  });
});