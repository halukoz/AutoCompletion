'use strict';

var services = angular.module('services', []);

services.service('addressService', function($http, $q, $window){

  this.findMyCoordinates = function() {

		var deferred = $q.defer();

        if (!$window.navigator.geolocation) {
            deferred.reject('location could not find.');
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    deferred.resolve(position);
                },
                function (err) {
                    deferred.reject(err);
                });
        }

        return deferred.promise;
  }

	this.findAddressesWithCoordinates = function(latitude, longitude) {

		var defer = $q.defer();
		$http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude + ","+ longitude +"&sensor=false").then(function(response) {
	    	defer.resolve(response.data);
		});
	  return defer.promise;
	}

});
