'use strict';

var services = angular.module('services', []);

services.service('addressService', function() {

  this.findAddressesWithCoordinates = function() {
    return "adressses";
  }
});
