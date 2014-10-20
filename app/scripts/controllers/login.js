'use strict';

angular.module('vioApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $rootScope) {
    $scope.user = {};
    $scope.errors = {};

    $rootScope.location = $location.path().substr(1,$location.path().length);

    $scope.login = function(form) {
      $scope.submitted = true;
      
      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors.other = err.message;
        });
      }
    };
  });
