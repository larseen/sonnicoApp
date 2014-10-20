'use strict';

angular.module('vioApp')
  .controller('employeeModal', function ($scope, $location, $rootScope, employee, $modalInstance) {
    
    var update = false

    if(employee){
      var update = true
    }
    
    $scope.employee = employee;
    console.log($scope.employee);  

  $scope.alter = function () {
    console.log($scope.employee);
    $modalInstance.close({'update': update, 'employee': $scope.employee});
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.remove = function () {
    $modalInstance.close({'remove': true, 'employee': $scope.employee});
  };


  });