describe('domManipulation', function() {
  'use strict';

  var $selectedElement, selectedElement;

  beforeEach(function() {
    affix('.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]');

    $selectedElement = $('#toddler');
    selectedElement = $selectedElement[0];
  });

  it('should be able to remove a HTML element', function() {
    expect(document.contains(selectedElement)).toBe(true);
    dom.remove(selectedElement);
    expect(document.contains(selectedElement)).toBe(false);
  });

  it('should append a HTML element to the given element', function() {
    var newElement = document.createElement('h4');
    var initialChildrenCount = $selectedElement.children().length;

    expect(initialChildrenCount).toBeGreaterThan(0);

    dom.append(selectedElement, newElement);

    expect($selectedElement.children().length).toBe(initialChildrenCount + 1);
    expect($selectedElement.children()[initialChildrenCount]).toBe(newElement);
  });

  it('should prepend a HTML element to the given element', function() {
    var newElement = document.createElement('h4');
    var initialChildrenCount = $selectedElement.children().length;

    expect(initialChildrenCount).toBeGreaterThan(0);

    dom.prepend(selectedElement, newElement);

    expect($selectedElement.children().length).toBe(initialChildrenCount + 1);
    expect($selectedElement.children()[0]).toBe(newElement);
  });

  it('should be able to add a new HTML element after a given HTML element', function() {
    var newElement = document.createElement('div');

    var $targetElement = $('.creature');
    var targetElement = $targetElement[0];

    expect($targetElement.next()[0]).not.toBe(newElement);
    dom.after(targetElement, newElement);
    expect($targetElement.next()[0]).toBe(newElement);
  });

  it('should be able to add a new HTML element before a given HTML element', function() {
    var newElement = document.createElement('main');

    expect($selectedElement.prev()[0]).not.toBe(newElement);
    dom.before(selectedElement, newElement);
    expect($selectedElement.prev()[0]).toBe(newElement);
  });

  it('should return a value of a given HTML non-select element', function() {
    var element = $('.creature')[0];
    var elementValue = dom.val(element);

    expect(elementValue).toBe('unicorn');

    element.value = 'pikachu';

    elementValue = dom.val(element);
    expect(elementValue).toBe('pikachu');
  });

  it('should return a value of a given select HTML element', function(){
    $selectedElement = $selectedElement.affix('select option[value="Option1"]+option[value="Option2"][selected=true]');
    expect(dom.val(document.querySelector('select'))).toBe('Option2');
  });

  it('should not throw exception if the target element is not in the DOM when calling dom.remove', function() {
    var elementNotInTheDom = document.createElement('div');
    expect(function() {
      dom.remove(elementNotInTheDom);
    }).not.toThrowError();
  });

  it('should not throw exception if the target element is not in the DOM when calling dom.after', function() {
    var elementNotInTheDom = document.createElement('div');
    var newElement = document.createElement('h4');

    expect(function() {
      dom.after(elementNotInTheDom, newElement);
    }).not.toThrowError();
  });
});
