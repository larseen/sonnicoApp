'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * employee Schema
 */
var employeeSchema = new Schema({
	name: String,
	email: String,
	phone: Number
});

mongoose.model('Employee', employeeSchema);
