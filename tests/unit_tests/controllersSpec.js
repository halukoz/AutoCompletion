describe('Testing Autocompletion Controllers', function() {

  var scope, addressCtrl;
  var addressService;

  beforeEach(module('autocompleteApp'));
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    addressController = $controller('mainCtrl', {$scope:scope}, {addressService:addressService});
  }));

  it('Initilize values in Address Controller', function() {
    expect(scope.searchItems).toBeDefined();
    expect(scope.searchItems.length).toBe(2);
  });
});
