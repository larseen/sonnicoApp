'use strict';

angular.module('vioApp')
  .controller('serviceModal', function ($scope, $location, $rootScope, $modalInstance, admin, User) {
    
    $rootScope.location = $location.path().substr(1,$location.path().length);
    $scope.users = User.query();
    $scope.user;
    $scope.serviceTypes = ['Brann', 'Nødlys', 'Elektro', 'Termografi'];
    $scope.serviceIntervals = [
    {
      'interval': 15768000000,
      'intervalString': '6 Måneder'
    },
    {
      'interval': 31536000000,
      'intervalString': '12 Måneder'
    },
    {
      'interval': 63072000000,
      'intervalString': '24 Måneder'
    },
    {
      'interval': 94608000000,
      'intervalString': '36 Måneder'
    }];

    $scope.$watch('dateCompleted', function(newValue, oldValue) {
      $scope.dateRenewal = newValue.getTime() + $scope.serviceInterval.interval;
    });
    $scope.$watch('serviceInterval', function(newValue, oldValue) {
      $scope.dateRenewal = $scope.dateCompleted.getTime() + newValue.interval;
    });
    
    $scope.serviceInterval = $scope.serviceIntervals[0];
    $scope.serviceType = 'Brann';
    $scope.dateCompleted = new Date();
    $scope.dateRenewal = $scope.dateCompleted.getTime() + $scope.serviceInterval.interval;

    if(admin){
      $scope.isAdmin = true;
    }

  $scope.alter = function (serviceInput) {
    console.log($scope.user);
    var service = {};
    if(!$scope.user==undefined){
    var user = {}
            user.name = $scope.user.name;
            user.id = $scope.user._id;
            service.user = user;
    }
    service.dateCompleted = $scope.dateCompleted;
    service.dateRenewal = new Date($scope.dateRenewal);
    service.serviceInterval = $scope.serviceInterval;
    service.serviceType = $scope.serviceType;
    service.comment = serviceInput.comment;
    service.contractNumber = serviceInput.contractNumber;
    $modalInstance.close(service);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  });