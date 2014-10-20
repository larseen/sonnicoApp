'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * service Schema
 */
var serviceSchema = new Schema({
	contractNumber: String,
	user: {
    name: String,
    id: {type: Schema.Types.ObjectId, ref: 'User' }
  },
  dateCompleted: Date,
  serviceType: String,
  serviceInterval: {
    interval: String,
    intervalString: String
  },
  dateRenewal: Date,
  comment: String
});

mongoose.model('Service', serviceSchema);
