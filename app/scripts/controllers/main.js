'use strict';

angular.module('vioApp')

.controller('MainCtrl', function ($scope, Customer) {

	$scope.init = function(){
		$scope.getCustomers();
	}

	$scope.getCustomers = function(){
		Customer.query().$promise.then(function (result) {
		    for (var i = 0; i < result.length; i++) {
		    	result[i]['status'] = $scope.contractStatus(result[i].activeContracts)
		    };
		    $scope.companies = result;
		    console.log($scope.companies);
		});
	}


	$scope.contractStatus = function(contracts){
		var object = {};
		for (var i = 0; i < contracts.length; i++) {
			var message = $scope.returnMessage(contracts[i]);
			if(contracts[i].serviceType=='Nødlys'){
				object['Nodlys'] = message;
			}
			object[contracts[i].serviceType] = message;
		};
		return object;
	}

	$scope.returnMessage = function(contract) {
		var daysToRenewal = $scope.daysToRenewal(contract.dateRenewal);
		if(daysToRenewal==null){
			return({'class': "alert alert-info", 'message': 'Ingen kontrakt'});
		}
		else if(daysToRenewal > 31){
			return({'class': "alert alert-success", 'message': contract.dateRenewal});
		}
		else if(daysToRenewal < 1){
			return({'class': "alert alert-danger", 'message': contract.dateRenewal});
		}
		else if(daysToRenewal > 1){
			return({'class': "alert alert-warning", 'message': contract.dateRenewal});
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