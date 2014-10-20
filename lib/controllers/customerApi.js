'use strict';

var mongoose = require('mongoose'),
    Customer = mongoose.model('Customer');
/**
 * Get awesome customers
 */
exports.all = function(req, res) {
	var query = Customer.find();
        query.populate('activeContracts');
        query.exec( function (err, customers) {
		if(err) return res.send(err);
		res.send(customers);
	});
};

exports.get = function(req, res) {
	var query = Customer.findById(req.params.id);
	query.populate('supervisors.fire');
	query.populate('employees');
	query.populate('comments');
	query.populate('activeContracts');
	query.populate('expiredContracts');
	query.populate('supervisors.elektro');
	query.populate('supervisors.alert');
	query.populate('supervisors.thermo');
	query.exec(function (err, customer) {
		console.log(customer);
		if(err) return res.send(err);
		if(!customer) return res.send(404);
		res.send(customer);
	});
};

exports.add = function(req, res) { //Legger til et nytt produkt
	console.log(req.body);
    var newCustomer = new Customer(req.body);
    newCustomer.save(function (err, customer){
    	console.log(err);
        if (err) return res.json(400, err);
        return res.send(customer);
    });
};

exports.update = function(req, res) { //Legger til et nytt produkt
    var customer = req.body;
    console.log('+++++++++++');
    console.log(req.body);
    var id = req.body._id;
    delete customer._id;
    Customer.update({_id: id}, customer, {multi: false}, function (err, customer){
    	console.log(err);
        if(err) return res.send(err);
        console.log(customer);
        res.send(customer);
    });
};
