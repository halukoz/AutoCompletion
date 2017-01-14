describe('Testing Autocompletion Services', function() {

  var scope, mainCtrl;
  var addressService;
  var countryService;

  beforeEach(module('autocompleteApp'));

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    mainCtrl = $controller('mainCtrl', {$scope:scope});
  }));

  beforeEach(inject(function(_countryService_) {
    countryService = _countryService_;
  }));


  it("Should be address list size 24: ", function() {

    expect(countryService.getCountryList().length).toBe(24);
  });

});
