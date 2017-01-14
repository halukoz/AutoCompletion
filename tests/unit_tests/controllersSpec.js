describe('Testing Autocompletion Controllers', function() {

  var scope, addressCtrl;
  var addressService;

  beforeEach(module('autocompleteApp'));
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    addressController = $controller('addressCtrl', {$scope:scope}, {addressService:addressService});
  }));

  it('Initilize values in Address Controller', function() {
    expect(scope.test).toBeDefined();
    expect(scope.test).toBe("haluk");
  });
});
