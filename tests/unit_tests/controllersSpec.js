describe('Testing Autocompletion Controllers', function() {

  var scope, addressCtrl;

  beforeEach(module('autocompleteApp'));
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    addressController = $controller('addressCtrl', {$scope:scope});
  }));

  it('Initilize values in Address Controller', function() {
    expect(scope.test).toBeDefined();
    expect(scope.test).toBe("haluk");
  });
});
