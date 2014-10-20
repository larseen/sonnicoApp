'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * customer Schema
 */
var customerSchema = new Schema({
  customerNumber: { type: String, required: true},
  customer: {type: String, required: true},
  adress: {type: String, required: true},
  postalcode: {type: String, required: true},
  city: {type: String, required: true},
  startingPrice: Number,
  regulatedPrice: Number,
  dateJoined: Date,
  lastRegulation: Date,
  nextRegulation: Date,
  supervisors: {
    fire: { type: Schema.Types.ObjectId, ref: 'User' },
    elektro: { type: Schema.Types.ObjectId, ref: 'User' },
    alert: { type: Schema.Types.ObjectId, ref: 'User' },
    thermo: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  employees: [{type: Schema.Types.ObjectId, ref: 'Employee'}],
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  activeContracts: [{type: Schema.Types.ObjectId, ref: 'Service'}],
  expiredContracts: [{type: Schema.Types.ObjectId, ref: 'Service'}]
});

mongoose.model('Customer', customerSchema);
