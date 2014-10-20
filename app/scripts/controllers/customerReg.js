'use strict';

angular.module('vioApp')
.controller('CustomerRegCtrl', function ($scope, $modal, Employee, Customer, User, Service, $routeParams) {

    $scope.init = function(){
      $scope.getCustomer();
      $scope.getUsers();
    }

    console.log($routeParams.customerId);

    $scope.getCustomer = function(){
        if($routeParams.customerId==undefined){
          $scope.customer = {};
          $scope.customer.employees = [];
          $scope.customer.activeContracts = [];
        $scope.customer.dateJoined = new Date();
        $scope.customer.lastRegulation = new Date();
        $scope.customer.nextRegulation = new Date();
        $scope.update = false;
        }else{
          Customer.get({id: $routeParams.customerId}).$promise.then(function (result) {
            $scope.customer = result;
            console.log(result);
            $scope.adress = result.adress+', '+result.postalcode+' '+result.city+' Norway';
            });
          $scope.update = true;
        }
    }

    $scope.getUsers = function(){
        $scope.users = User.query();
    }

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
            if(response.update){
               console.log(response);
               var updatedEmployee = new Employee({'employee': response.employee, 'customerId': $routeParams.customerId});
               updatedEmployee.$update({id: response.employee._id}).then( function(data){
                  console.log(data);
        		//need to update list on client side ?
            }); 
           }else if(response.remove){
               var employee = new Employee({'employee': response.employee, 'customerId': $routeParams.customerId});
               employee.$remove( function(data){
                  console.log(data);
        		//Remove data.employee from list
            });
           }else{
            console.log(response);
            var newEmployee = new Employee({'employee': response.employee, 'customerId': $routeParams.customerId});
            newEmployee.$save(function(data){
               console.log(data);
               $scope.customer.employees.push(data);
           });
        }	
    }, function () {
      $log.info('Modal dismissed at');
  });
    };

    $scope.serviceModal = function() {
    	var admin = true;
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
        	console.log(response);
            var newService = new Service({'service': response, 'customerId': $routeParams.customerId});
            newService.$save(function(data){
               console.log(data);
               $scope.customer.activeContracts.push(data);
           });
        }, function () {
          $log.info('Modal dismissed at');
      });
    };

    $scope.addCustomer = function() {
      if($scope.update){
        var employees = [];
       var activeContracts = [];
        if($scope.customer.supervisors.fire){
        $scope.customer.supervisors.fire = $scope.customer.supervisors.fire._id;
      }
      if($scope.customer.supervisors.elektro){
        $scope.customer.supervisors.elektro = $scope.customer.supervisors.elektro._id;
      }
      if($scope.customer.supervisors.alert){
        $scope.customer.supervisors.alert = $scope.customer.supervisors.alert._id;
      }
      if($scope.customer.supervisors.thermo){
        $scope.customer.supervisors.thermo = $scope.customer.supervisors.thermo._id;
      }
      delete $scope.customer.activeContracts;
      delete $scope.customer.employees;
      delete $scope.customer.comments;
        $scope.customer.$update({id: $scope.customer._id}, $scope.customer);
      }else{
    	var customer = $scope.customer;
      if($scope.customer.supervisors.fire){
        customer.supervisors.fire = $scope.customer.supervisors.fire._id;
      }
      if($scope.customer.supervisors.elektro){
        customer.supervisors.elektro = $scope.customer.supervisors.elektro._id;
      }
      if($scope.customer.supervisors.alert){
        customer.supervisors.alert = $scope.customer.supervisors.alert._id;
      }
      if($scope.customer.supervisors.thermo){
        customer.supervisors.thermo = $scope.customer.supervisors.thermo._id;
      }
      customer.employees = [];
      customer.activeContracts = [];
        for (var i = 0; i < $scope.customer.employees.length; i++) {
          customer.employees.push($scope.customer.employees[i]._id);
    	};
    	for (var i = 0; i < $scope.customer.activeContracts.length; i++) {
    		customer.activeContracts.push($scope.customer.activeContracts[i]._id);
    	};
      console.log(customer);
        var newCustomer = new Customer(customer);
        newCustomer.$save(function(data){
            console.log(data);
        });
      }
    };

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

     $scope.init();

 });
