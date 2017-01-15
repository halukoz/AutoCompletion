// developed by Haluk Ozduman, 2017

'use strict';
// services contain different services, such as addressService, countryService, autoCompletionService
var services = angular.module('services', []);
// autoCompletionService provides suggestions for users while they are typing.
services.service('autoCompletionService', function() {
  this.search = function(list, searchCriteria) { // get lists such as address list or country list and searchCriteria which is typed by the user and search the searchCriteria in the list.
    list.sort(); // sort the list items alphabetically.
    var results = []; // results list is initially empty.
    for (var i=0; i < list.length; i++) {
      var listItem = angular.lowercase(list[i]); // get item from item list one by one and convert them to lowercase
      var searchCriteriaLowerCase = angular.lowercase(searchCriteria); // convert the searchCriteria to lowercase
      if (listItem.indexOf(searchCriteriaLowerCase) !== -1) { // if the list item contains the searchCriteria, this means, this can be a suggestion for the user.
        results.push(list[i]);
      }
    }
    return results;
  }
});

// country service provides dummy data for this application (Dummy data: country names)
services.service('countryService', function() {

this.getCountryList = function() {
  var countryItems = [
    "Germany","USA","Argentina","Belgium","Australia", "Hong Kong", "Estonia", "Finland", "France", "Iceland", "Greece",
    "Japan", "Latvia", "Korea, South", "Macedonia", "Morocco", "Norway", "Portugal", "Qatar", "Romania", "Spain", "Turkey",
    "United Kingdom", "Vietnam"
  ];
  return countryItems;
}
});

// Address service, find your location and provides some addresses which are near you.
services.service('addressService', function($http, $q, $window){

this.findUserCoordinates = function() {  // this function finds users' coordinates.
  var deferred = $q.defer();  // provides asynchronous data loading, return values when the process is done.
  if (!$window.navigator.geolocation) {
    deferred.reject('location could not find.');  // if the location could not be found.
  } else {
    $window.navigator.geolocation.getCurrentPosition(
    function (position) {  // if position is found, send the information to the controller.
      deferred.resolve(position);
    },
    function (err) {  // if some error are happened, do not send the data to the controller.
      deferred.reject(err);
    });
  }
  return deferred.promise; // after loading, send the information to controller
}

// this function return addresses according to given latitude and longitude values. Get data from googleapis. (this API is free, we do not need to add any key)
this.findAddressesWithCoordinates = function(latitude, longitude) {
  var defer = $q.defer();
  $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude + ","+ longitude +"&sensor=false").then(function(response) {
    defer.resolve(response.data);
  });
  return defer.promise;
}
});
