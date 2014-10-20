'use strict';

angular.module('vioApp')
  .controller('commentModal', function ($scope, $location, $rootScope, $modalInstance) {
    
    $scope.comment = '';

  $scope.alter = function () {
    console.log($scope.comment);
    $modalInstance.close($scope.comment);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  });