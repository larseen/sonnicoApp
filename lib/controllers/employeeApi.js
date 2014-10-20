'use strict';

var mongoose = require('mongoose'),
    Employee = mongoose.model('Employee'),
    Customer = mongoose.model('Customer');

/**
 * Get awesome employees
 */

exports.add = function(req, res) { //Legger til et nytt produkt

    var newEmployee = new Employee(req.body.employee);
    var customerId = req.body.customerId;
    if(customerId==undefined){
        newEmployee.save(function (err, employee){
        if (err) return res.json(400, err);
        console.log(employee);
        return res.send(employee);
    });
    }else{
    newEmployee.save(function (err, employee){
        if (err) return res.json(400, err);
        Customer.findByIdAndUpdate( customerId ,{$push: {employees: employee._id}},{safe: true, upsert: true}, function(err, customer) {
        });
        console.log(employee);
        return res.send(employee);
    });
}
};

exports.remove = function(req, res) { //Legger til et nytt produkt
    console.log(req);
    Employee.findByIdAndRemove(req.params.id , function (err, employee){
        console.log(employee);
        if(err) return res.send(err);
        res.send(employee);
    });
};

exports.update = function(req, res) { //Legger til et nytt produkt
    var employee = req.body.employee;
    var id = req.body.employee._id;
    delete employee._id;
    Employee.update({_id: id}, employee, {multi: false}, function (err, employee){
        if(err) return res.send(err);
        res.send(employee);
    });
};

