/*global ajaxReq*/

describe('AjaxRequest', function() {
  'use strict';

  beforeEach(function() {
    jasmine.Ajax.install();

    this.onSuccessSpy = jasmine.createSpy('success');
    this.onFailureSpy = jasmine.createSpy('failure');
    this.onCompleteSpy = jasmine.createSpy('complete');

    jasmine.Ajax.stubRequest('/infinum/index').andReturn({
      status: 200,
      responseText: '{ "response": "incredible cool things" }'
    });

    jasmine.Ajax.stubRequest('/infinum/not-found').andReturn({
      "status": 404,
      "responseText": 'page not found'
    });
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it('should make a successful ajax request', function() {
    ajaxReq('/infinum/index', {
      success: this.onSuccessSpy,
      complete: this.onCompleteSpy,
      failure: this.onFailureSpy
    });

    expect(this.onSuccessSpy).toHaveBeenCalled();
    expect(this.onFailureSpy).not.toHaveBeenCalled();
    expect(this.onCompleteSpy).toHaveBeenCalled();
  });

  it('should make POST ajax request', function() {
    ajaxReq('/infinum/index', {
      success: this.onSuccessSpy,
      complete: this.onCompleteSpy,
      failure: this.onFailureSpy,
      method: 'POST'
    });

    expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
    expect(this.onSuccessSpy).toHaveBeenCalled();
    expect(this.onFailureSpy).not.toHaveBeenCalled();
    expect(this.onCompleteSpy).toHaveBeenCalled();
  });

  it('should call a custom function with proper context on failure', function() {
    var context = {
      secretUnicorn: 'Glumpsy'
    };

    var onFailure = function(xhr, status, responseText) {
      expect(status).toBe(404);
      expect(responseText).toBe('page not found');
      expect(this).toBe(context);
      expect(this.secretUnicorn).toBe('Glumpsy');
    };

    var methods = {
      onFailure: onFailure
    };

    spyOn(methods, 'onFailure').and.callFake(onFailure);

    ajaxReq('/infinum/not-found', {
      success: this.onSuccessSpy,
      failure: methods.onFailure,
      complete: this.onCompleteSpy,
      context: context
    });

    expect(methods.onFailure).toHaveBeenCalled();
    expect(this.onCompleteSpy).toHaveBeenCalled();
    expect(this.onSuccessSpy).not.toHaveBeenCalled();
  });

  it('should call a custom function with proper context on success', function() {
    var context = {
      secretUnicorn: 'Glumpsy'
    };

    var onSuccess = function(data, status, xhr) {
      expect(status).toBe(200);
      expect(data.response).toBe('incredible cool things');
      expect(this).toBe(context);
      expect(this.secretUnicorn).toBe('Glumpsy');
    };

    var methods = {
      onSuccess: onSuccess
    };

    spyOn(methods, 'onSuccess').and.callFake(onSuccess);

    ajaxReq('/infinum/index', {
      success: methods.onSuccess,
      failure: this.onFailureSpy,
      complete: this.onCompleteSpy,
      context: context
    });

    expect(methods.onSuccess).toHaveBeenCalled();
    expect(this.onCompleteSpy).toHaveBeenCalled();
    expect(this.onFailureSpy).not.toHaveBeenCalled();
  });

  it('should call a custom function with proper context when request is completed', function() {
    var context = {
      secretUnicorn: 'Glumpsy'
    };

    var onComplete = function(xhr, status) {
      expect(status).toBe(200);
      expect(this).toBe(context);
      expect(this.secretUnicorn).toBe('Glumpsy');
    };

    var methods = {
      onComplete: onComplete
    };

    spyOn(methods, 'onComplete').and.callFake(onComplete);

    ajaxReq('/infinum/index', {
      success: this.onSuccessSpy,
      failure: this.onFailureSpy,
      complete: methods.onComplete,
      context: context
    });

    expect(methods.onComplete).toHaveBeenCalled();
    expect(this.onSuccessSpy).toHaveBeenCalled();
    expect(this.onFailureSpy).not.toHaveBeenCalled();
  });
});