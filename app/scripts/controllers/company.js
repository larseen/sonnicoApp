'use strict';

angular.module('vioApp')

.controller('CompanyCtrl', function ($scope, $http, $routeParams, $window, Employee, $modal, $log, Auth, Customer, $rootScope, Service, Comment) {
    
	$scope.user = Auth.currentUser();
    Customer.get({id: $routeParams.companyId}).$promise.then(function (result) {
        $scope.customer = result;
        $scope.adress = result.adress+', '+result.postalcode+' '+result.city+' Norway';
    });
    

    console.log($scope.adress);
    console.log($scope.customer);	
  

    $scope.commentModal = function() {
        var modalInstance = $modal.open({
        templateUrl: 'views/partials/commentModal.html',
          controller: 'commentModal'
        });
        modalInstance.result.then(function (response) {
        response.user = $rootScope.currentUser.name;
        var newComment = new Comment({'comment': response, 'customerId': $routeParams.companyId});
        newComment.$save(function(comment){
            console.log(comment);
            $scope.customer.comments.push(comment);
        });
    }, function () {
      $log.info('Modal dismissed at');
        });
    };

    $scope.employeeModal = function(employee) {
    	console.log(employee);
        var modalInstance = $modal.open({
        templateUrl: 'views/partials/employeeModal.html',
          controller: 'employeeModal',
            resolve: {
                employee: function () {   //sends the employee to the controller
                    return employee;
                }
            }
        });
        modalInstance.result.then(function (response) {
            console.log(response);
        if(response.update){ 
            var employee = new Employee({'employee': response.employee});
            employee.$update({id: response.employee._id}, function(employee){
                console.log(employee);
            });
    	}else{
        var newEmployee = new Employee({'employee': response.employee, 'customerId': $routeParams.companyId});
        newEmployee.$save(function(employee){
            $scope.customer.employees.push(employee);
            });
        };
    }, function () {
      $log.info('Modal dismissed at');
        });
    };

    $scope.serviceModal = function() {
        var admin = false;
        var modalInstance = $modal.open({
        templateUrl: 'views/partials/serviceModal.html',
          controller: 'serviceModal',
          resolve: {
                admin: function () {   //sends the admin to the controller
                    return admin;
                }
            }
        });
        modalInstance.result.then(function (response) {
            var user = {}
            user.name = $scope.user.name;
            user.id = $scope.user._id;
            response.user = user;
        var newService = new Service({'service': response, 'customerId': $routeParams.companyId});
        newService.$save(function(service){
            console.log(service);
            Customer.get({id: $routeParams.companyId}).$promise.then(function (result) {
                $scope.customer.activeContracts = result.activeContracts;
                $scope.customer.expiredContracts = result.expiredContracts;
            });
        });
    }, function () {
      $log.info('Modal dismissed at');
        });
    };

    $scope.deleteEmployee = function(employee, index) {
        var removeEmployee = new Employee(employee);
        removeEmployee.$delete({id: employee._id}, function(employee){
            $scope.customer.employees.splice(index,1);
        });
    }


    $scope.returnClassStatus = function(service) {
        var daysToRenewal = $scope.daysToRenewal(service.dateRenewal);
                if(daysToRenewal > 31){
                    return('panel panel-success');
                }
                else if(daysToRenewal < 1){
                    return('panel panel-danger');
                }
                else if(daysToRenewal > 1){
                    return('panel panel-warning');
                }

    };


    $scope.daysToRenewal = function(dateRenewal) {
      	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
		var today = new Date();
		var secondDate = new Date(dateRenewal);
		var diffDays = Math.round(Math.abs((today.getTime() - secondDate.getTime())/(oneDay)));
		if(today.getTime() > secondDate.getTime()){
			diffDays = diffDays*-1;
		}
		return diffDays;
    };

});
