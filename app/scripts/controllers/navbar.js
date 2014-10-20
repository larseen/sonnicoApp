'use strict';

angular.module('vioApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $rootScope, $modal, $log) {
    
    $scope.location = '/'+$location.path().split('/')[1];

    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };

    $scope.currentUserModal = function() {
        var user = Auth.currentUser();
        var modalInstance = $modal.open({
        templateUrl: 'views/partials/currentUserModal.html',
          controller: 'CurrentUserModal',
            resolve: {
                user: function () {   //sends the user to the controller
                    return user;
                }
            }
        });
        modalInstance.result.then(function (response) {
          if(response.password){
            Auth.changePassword( response.user.oldPassword, response.user.newPassword )
              .then( function() {
                $scope.message = 'Password successfully changed.';
              })
              .catch( function(err) {
                //something here ?
              });
          }else{
            response.user.$update({id: response.user._id}).then( function(data) {
              $scope.user = data;
              $rootScope.currentUser.name = data.name;
            });
          }
    }, function () {
      $log.info('Modal dismissed at');
        });
    };

  });