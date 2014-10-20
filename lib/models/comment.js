'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * comment Schema
 */
var commentSchema = new Schema({
	comment: String,
	date: { type: Date, default: Date.now},
  user: String
});

mongoose.model('Comment', commentSchema);
