'use strict';

var controllers = angular.module("controllers", []);

controllers.controller('addressCtrl', ['$scope', 'addressService', function($scope, addressService) {
    $scope.test = "haluk";
    $scope.addressList = addressService.findAddressesWithCoordinates();
}]);
