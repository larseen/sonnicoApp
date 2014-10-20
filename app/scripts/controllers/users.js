'use strict';

angular.module('vioApp')
.controller('UsersCtrl', function ($scope, User, $modal, $log, Auth) {


  $scope.init = function(){
    $scope.getUsers();
  };

  $scope.getUsers = function(){
    $scope.users = User.query();
  };

  $scope.userModal = function(user) {
    var modalInstance = $modal.open({
      templateUrl: 'views/partials/userModal.html',
      controller: 'UserModal',
      resolve: {
                user: function () {   //sends the user to the controller
                  return user;
                }
              }
            });
    modalInstance.result.then(function (response) {
     if(response.remove){
      response.user.$remove({id: response.user._id}).then( function() {
       $scope.users = User.query();
     });
    }
      else if(response.resetPassword){
      response.user.$save({id: response.user._id}, response.user).then( function() {
       $scope.users = User.query();
     });
      }else if(response.update){
      response.user.$update({id: response.user._id}).then( function(data) {
              $scope.users = User.query();
            });
     
         }else{
      Auth.createUser(response)
      .then( function() {
       $scope.users = User.query();
     })
      .catch( function(err) {
        err = err.data;
        $scope.errors = {};

		          // Update validity of form fields that match the mongoose errors
		          angular.forEach(err.errors, function(error, field) {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.message;
              });
		        });
    }
  }, function () {
    $log.info('Modal dismissed at');
  });
  };

  $scope.init();

});
