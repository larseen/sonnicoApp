'use strict';
angular.module('vioApp')
    .controller('UserModal', function ($scope, $location, $rootScope, $modalInstance, user) {

    $scope.init =function(user){
        if(!user){
            $scope.newUser = true;
            $scope.user = {};
        }else{
            $scope.user = user;
        }
    };

    $scope.alterUser = function () {
        console.log({'update': true, 'user': $scope.user});
        $modalInstance.close({'update': true, 'user': $scope.user});
    };

    $scope.addUser = function () {
        $scope.user.password = Math.random().toString(36).substr(2, 8);
        console.log($scope.user);
        $modalInstance.close($scope.user);
    };

    $scope.resetPassword = function () {
        console.log({'resetPassword': true, 'user': $scope.user});
        $modalInstance.close({'resetPassword': true, 'user': $scope.user});
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.remove = function () {
        console.log({'remove': true, 'user': $scope.user});
        $modalInstance.close({'remove': true, 'user': $scope.user});
    };

    $scope.init(user);

});

