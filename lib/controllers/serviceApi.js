'use strict';

var mongoose = require('mongoose'),
    Service = mongoose.model('Service'),
    Customer = mongoose.model('Customer'),
    async = require('async');
/**
 * Get awesome companys
 */
exports.all = function(req, res) {
	Service.find( function (err, services) {
		if(err) return res.send(err);
		if(!services) return res.send(404);
		res.send(services);
	});
};

exports.add = function(req, res) { //Legger til et nytt produkt
    var service = req.body.service;
    var newService = new Service(service);
    var query = Customer.findById(req.body.customerId);
    console.log(req.body);
    if(req.body.customerId == undefined){
         newService.save(function (err, service){
                        if (err) return res.json(400, err);
                        Customer.findByIdAndUpdate( req.body.customerId ,{$push: {activeContracts: service._id}},{safe: true, upsert: true}, function(err, customer) {
                        if (err) return res.json(400, err);
                        });
                        return res.send(service);
                    });
    }else{
    query.populate({path: 'activeContracts', match: {serviceType: service.serviceType}});
    query.exec(function (err, customer) { 
        if(err) return res.send(err);
        if(customer.activeContracts.length === 0){
            newService.save(function (err, service){
                if (err) return res.json(400, err);
                Customer.findByIdAndUpdate( req.body.customerId ,{$push: {activeContracts: service._id}},{safe: true, upsert: true}, function(err, customer) {
                if (err) return res.json(400, err);
                });
                return res.send(service);
            });
            console.log(customer);
        }else{
            var expiredContract = customer.activeContracts[0]._id;
            Customer.findByIdAndUpdate( req.body.customerId ,{$pull: {activeContracts: expiredContract}},{safe: true, upsert: true}, function(err, customer) {
                if(err) return res.send(err);
                Customer.findByIdAndUpdate( req.body.customerId ,{$push: {expiredContracts: expiredContract}},{safe: true, upsert: true}, function(err, customer) {
                    if(err) return res.send(err);
                    newService.save(function (err, service){
                        if (err) return res.json(400, err);
                        Customer.findByIdAndUpdate( req.body.customerId ,{$push: {activeContracts: service._id}},{safe: true, upsert: true}, function(err, customer) {
                        if (err) return res.json(400, err);
                        });
                        return res.send(service);
                    });
                });
            });
        }
    });
}
};

exports.get = function(req, res) {
    Service.findById(req.params.id, function (err, services) {
        console.log(services);
        if(err) return res.send(err);
        if(!services) return res.send(404);
        res.send(services);
    });
};