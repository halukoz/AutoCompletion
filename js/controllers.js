'use strict';

var controllers = angular.module("controllers", []);

controllers.controller('mainCtrl', ['$scope', '$rootScope','$location', '$http', 'countryService','addressService', 'autoCompletionService',
	function mainCtrl($scope, $rootScope, $location, $http, countryService, addressService, autoCompletionService) {

	var http = $http;
	var scope = $scope;

  var latitude = 0;
  var longitude = 0;

  scope.selectedCountryIndex = -1;
  scope.selectedAddressIndex = -1;

  scope.searchCountry = function() {
    if (scope.countryText.length === 0) {
			scope.countryList = [];
		} else {
			scope.countryList = autoCompletionService.search(countryService.getCountryList(),scope.countryText);
		}
  }

  scope.searchAddress = function() {
		if(scope.addressText.length === 0) {
			scope.addressList = [];
		} else {
			scope.addressList =  autoCompletionService.search(scope.currentAddresses,scope.addressText);
		}
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

  scope.selectCountry = function(index) {
		scope.countryText = scope.countryList[index];
    scope.countryList = [];
	}

  scope.selectAddress = function(index) {
		scope.addressText = scope.addressList[index];
		scope.addressList = [];
	}

  scope.controlCountryListWithKey = function(event) {
		if(event.keyCode === 13){
        scope.countryText = scope.countryList[scope.selectedCountryIndex];
        scope.countryList = [];
				scope.selectedCountryIndex = 0;
		}
    if (event.keyCode === 40) {
			if((scope.selectedCountryIndex < 5) && (scope.selectedCountryIndex+1 < scope.countryList.length)) {
					scope.selectedCountryIndex++;
			}
		} else if (event.keyCode === 38) {
			if(scope.selectedCountryIndex-1 >= 0) {
				scope.selectedCountryIndex--;
			}
    }
	}

	scope.controlAddressListWithKey = function(event) {
		if(event.keyCode === 13){
			scope.addressText = scope.addressList[scope.selectedAddressIndex];
			scope.addressList = [];
			scope.selectedAddressIndex = 0;
		}
		 if (event.keyCode === 40) {
			if((scope.selectedAddressIndex < 5) && (scope.selectedAddressIndex+1 < scope.addressList.length)) {
					scope.selectedAddressIndex++;
			}
		} else if (event.keyCode === 38) {
			if(scope.selectedAddressIndex-1 >= 0) {
				scope.selectedAddressIndex--;
			}
		}
	}

}]);
