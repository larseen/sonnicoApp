'use strict';

angular.module('vioApp')
  .controller('CurrentUserModal', function ($scope, $location, $rootScope, $modalInstance, user) {

  	$scope.user = user;
    $scope.userPass = {};
    $scope.alterPassword = false;
	 
	$scope.alterPassword = function () {
    console.log($scope.userPass);
    $modalInstance.close({'user': $scope.userPass, 'password': true});
  };

  $scope.alterUser = function () {
    console.log($scope.user);
    $modalInstance.close({'user': $scope.user, 'password': false});
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

