/*global affix, learnQuery*/

describe('LearnQuery', function() {
  'use strict';

  var $selectedElement, selectedElement, methods;

  beforeEach(function() {
    affix('.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]');

    methods = {
      showLove: function() {
        console.log('<3 JavaScript <3');
      },

      giveLove: function() {
        console.log('==> JavaScript ==>');
        return '==> JavaScript ==>';
      }
    };

    spyOn(methods, 'showLove');
    spyOn(methods, 'giveLove');

    $selectedElement = $('#toddler');
    selectedElement = $selectedElement.get(0);
  });

  it('should allow cssClass method chaining', function() {
    learnQuery('#toddler').addClass('one').addClass('two').removeClass('one');

    expect($selectedElement.hasClass('one')).toBe(false);
    expect($selectedElement.hasClass('two')).toBe(true);
  });

  it('should allow dom method chaining', function() {
    var newElementH4 = document.createElement('h4');
    var newElementH2 = document.createElement('h2');
    var newElementSpan = document.createElement('span');

    learnQuery('#toddler').before(newElementH4).after(newElementH2).append(newElementSpan);

    expect($selectedElement.next()[0]).toBe(newElementH2);
    expect($selectedElement.prev()[0]).toBe(newElementH4);
    expect($selectedElement.children().last()[0]).toBe(newElementSpan);
  });

  it('should allow eventListener method chaining', function() {
    learnQuery('#toddler').on('click', methods.showLove).on('click', methods.giveLove).trigger('click');

    expect(methods.showLove.calls.count()).toBe(1);
    expect(methods.giveLove.calls.count()).toBe(1);
  });

  it('should allow multiple methods chaining', function() {
    var newElementH4 = document.createElement('h4');

    learnQuery('#toddler').before(newElementH4).addClass('blury').on('hover', methods.showLove).trigger('hover');

    expect($selectedElement.prev()[0]).toBe(newElementH4);
    expect($selectedElement.hasClass('blury')).toBe(true);
    expect(methods.showLove).toHaveBeenCalled();
  });
});