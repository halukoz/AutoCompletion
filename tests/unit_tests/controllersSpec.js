describe('Testing Autocompletion Controllers', function() {

  var scope, mainCtrl;
  var country_Service;
  var autoCompletion_Service;

  beforeEach(module('autocompleteApp'));

  beforeEach(inject(function($controller, $rootScope, _countryService_, _autoCompletionService_) {

    country_Service = _countryService_;
    autoCompletion_Service = _autoCompletionService_;
    scope = $rootScope.$new();
    mainCtrl = $controller('mainCtrl', {$scope:scope}, {countryService:country_Service}, {autoCompletionService:autoCompletion_Service});
    spyOn(country_Service, 'getCountryList');
  }));

  it("inital condition, get country list is not called", function() {
    expect(country_Service.getCountryList).not.toHaveBeenCalled();
  })

  it("Should be address list size = 0, if countryText", function() {
    scope.countryText = "";
    scope.searchCountry();
    expect(country_Service.getCountryList).not.toHaveBeenCalled();
  });

  it("Select country test in [Germany, France] array", function() {
    scope.countryList = ["Germany", "France"];
    scope.selectCountry(0);
    expect(scope.countryText).toBe("Germany");
  });

  it("Select address test in [Charl, France] array", function() {
    scope.addressList = ["Charlottenburg", "Mitte"];
    scope.selectAddress(1);
    expect(scope.addressText).toBe("Mitte");
  });

  it("Key down tests for Address Search Box", function() {
    scope.selectedAddressIndex = 1;
    scope.addressList = ["Charlottenburg", "Mitte", "Kreuzberg"];
    var event = document.createEvent("Events");
    event.initEvent("keydown", true, true);
    event.keyCode = 40;
    scope.controlAddressListWithKey(event);
    expect(scope.selectedAddressIndex).toBe(2);
  });

  it("Key up tests for Address Search Box", function() {
    scope.selectedAddressIndex = 2;
    scope.addressList = ["Charlottenburg", "Mitte", "Kreuzberg"];
    var event = document.createEvent("Events");
    event.initEvent("keydown", true, true);
    event.keyCode = 38;
    scope.controlAddressListWithKey(event);
    expect(scope.selectedAddressIndex).toBe(1);
  });

  it("Key up tests for Address Search Box, important case, index = 0, result should be 0, otherwise cursor will be disappeared", function() {
    scope.selectedAddressIndex = 0;
    scope.addressList = ["Charlottenburg", "Mitte", "Kreuzberg"]
    var event = document.createEvent("Events");
    event.initEvent("keydown", true, true);
    event.keyCode = 38;
    scope.controlAddressListWithKey(event);
    expect(scope.selectedAddressIndex).toBe(0);
  });

  it("Key down tests for Address Search Box, important case, index = 5, result should be 5, otherwise cursor will be disappeared", function() {
    scope.selectedAddressIndex = 5;
    scope.addressList = ["Charlottenburg", "Mitte", "Kreuzberg"];
    var event = document.createEvent("Events");
    event.initEvent("keydown", true, true);
    event.keyCode = 40;
    scope.controlAddressListWithKey(event);
    expect(scope.selectedAddressIndex).toBe(5);
  });

  it("Key down tests for Country Search Box", function() {
    scope.selectedCountryIndex = 1;
    scope.countryList = ["Germany", "France", "Ireland"];
    var event = document.createEvent("Events");
    event.initEvent("keydown", true, true);
    event.keyCode = 40;
    scope.controlCountryListWithKey(event);
    expect(scope.selectedCountryIndex).toBe(2);
  });

  it("Key up tests for Country Search Box", function() {
    scope.selectedCountryIndex = 2;
    scope.CountryList = ["Germany", "France", "Ireland"];
    var event = document.createEvent("Events");
    event.initEvent("keydown", true, true);
    event.keyCode = 38;
    scope.controlCountryListWithKey(event);
    expect(scope.selectedCountryIndex).toBe(1);
  });

  it("Key up tests for Country Search Box, important case, index = 0, result should be 0, otherwise cursor will be disappeared", function() {
    scope.selectedCountryIndex = 0;
    scope.countryList = ["Germany", "France", "Ireland"];
    var event = document.createEvent("Events");
    event.initEvent("keydown", true, true);
    event.keyCode = 38;
    scope.controlCountryListWithKey(event);
    expect(scope.selectedCountryIndex).toBe(0);
  });

  it("Key down tests for Country Search Box, important case, index = 5, result should be 5, otherwise cursor will be disappeared", function() {
    scope.selectedCountryIndex = 5;
    scope.countryList = ["Germany", "France", "Ireland"];
    var event = document.createEvent("Events");
    event.initEvent("keydown", true, true);
    event.keyCode = 40;
    scope.controlCountryListWithKey(event);
    expect(scope.selectedCountryIndex).toBe(5);
  });
});
