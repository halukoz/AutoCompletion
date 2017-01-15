describe('Testing Autocompletion Services', function() {

  var scope, mainCtrl;
  var addressService;
  var countryService;
  var autoCompletionService;
  var $httpBackend;

  beforeEach(module('autocompleteApp'));

  beforeEach(inject(function($controller, $rootScope, _$httpBackend_) {
    scope = $rootScope.$new();
    mainCtrl = $controller('mainCtrl', {$scope:scope});
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(inject(function(_countryService_, _autoCompletionService_, _addressService_) {
    countryService = _countryService_;
    autoCompletionService = _autoCompletionService_;
    addressService = _addressService_;
  }));

  it("Should be address list size 24: ", function() {
    expect(countryService.getCountryList().length).toBe(24);
  });

  it("Should only return 1 value", function() {
    var testlist = ["Germany", "France", "Romania"];
    var testSearchKey = "ger"
    expect(autoCompletionService.search(testlist, testSearchKey).length).toBe(1);
  });

  it('Google API address test', function () {
         $httpBackend.expectGET('https://maps.googleapis.com/maps/api/geocode/json?latlng=52.517082599999995,13.323661099999981&sensor=false').respond('Hi!');
         var list = addressService.findAddressesWithCoordinates("52.517082599999995","13.323661099999981");
         $httpBackend.flush();
  });

});
