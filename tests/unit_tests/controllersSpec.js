describe('Testing Autocompletion Controllers', function() {

  var scope, mainCtrl;
  var addressService;
  var country_Service;


  beforeEach(module('autocompleteApp'));

  beforeEach(inject(function($controller, $rootScope, _countryService_) {

    country_Service = _countryService_;
    scope = $rootScope.$new();
    mainCtrl = $controller('mainCtrl', {$scope:scope}, {countryService:country_Service});
    spyOn(country_Service, 'getCountryList');
  }));

  it("inital condition, get country list is not called", function() {
    expect(country_Service.getCountryList).not.toHaveBeenCalled();
  })

  it("Should be address list size = 24", function() {
    scope.searchCountry();
    expect(country_Service.getCountryList).toHaveBeenCalled();
  });
});
