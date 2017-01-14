'use strict';

var controllers = angular.module("controllers", []);

controllers.controller('mainCtrl', ['$scope', '$location', '$http', 'addressService',
	function mainCtrl($scope, $location, $http, addressService) {

	var http = $http;
	var scope = $scope;

  var latitude = 0;
  var longitude = 0;

	scope.searchItems = [
		  "Germany",
		  "USA"
	];

  scope.searchCountry = function() {
		scope.countryList = scope.searchItems;
  }

  scope.searchAddress = function() {
		scope.addressList =   scope.currentAddresses;
  
  }

  addressService.findMyCoordinates().then(function(response) {
		latitude = response.coords.latitude;
		longitude = response.coords.longitude;

		addressService.findAddressesWithCoordinates(latitude, longitude).then(function(response) {
      scope.currentAddresses = [];
      for (var i=0; i < response.results.length; i++) {
          if (scope.currentAddresses.indexOf(response.results[i].formatted_address) < 0) {
							scope.currentAddresses.push(response.results[i].formatted_address);
					}
          for (var j=0; j < response.results[i].address_components.length; j++) {
          if (scope.currentAddresses.indexOf(response.results[i].address_components[j].long_name) < 0) {
						scope.currentAddresses.push(response.results[i].address_components[j].long_name);
					}
				}
			}
  		});
	});

}]);
